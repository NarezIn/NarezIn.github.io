/**
 * butterflies.js
 * Canvas-based butterfly particle effect module.
 * Exports: init, scatter, setColor, destroy.
 */

/** @type {HTMLCanvasElement|null} */
let canvas = null;

/** @type {CanvasRenderingContext2D|null} */
let ctx = null;

/** @type {Butterfly[]} */
let butterflies = [];

/** @type {number|null} */
let rafId = null;

/** @type {number} */
let currentHue = 200;

const GRAVITY = 0.04;
const DRAG = 0.97;

/**
 * A single animated butterfly particle.
 */
class Butterfly {
  /**
   * @param {number} x - Spawn X coordinate.
   * @param {number} y - Spawn Y coordinate.
   * @param {number} hue - HSL hue value for wing color.
   */
  constructor(x, y, hue) {
    const speed = 3 + Math.random() * 5;
    const dir = Math.random() * Math.PI * 2;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(dir) * speed;
    this.vy = Math.sin(dir) * speed - 2;
    this.hue = hue;
    this.bodyAngle = Math.random() * Math.PI * 2;
    this.bodyTurnRate = (Math.random() - 0.5) * 0.08;
    this.wingPhase = Math.random() * Math.PI * 2;
    this.wingSpeed = 0.12 + Math.random() * 0.1;
    this.size = 7 + Math.random() * 7;
    this.alpha = 0.9 + Math.random() * 0.1;
    this.decay = 0.004 + Math.random() * 0.004;
  }

  /**
   * Advance physics and animation by one frame.
   * @returns {void}
   */
  update() {
    this.vx *= DRAG;
    this.vy *= DRAG;
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    this.bodyAngle += this.bodyTurnRate;
    this.wingPhase += this.wingSpeed;
    this.alpha -= this.decay;
  }

  /**
   * Render the butterfly onto the given context.
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
   * @returns {void}
   */
  draw(ctx) {
    if (this.alpha <= 0) return;

    const s = this.size;
    const flap = Math.abs(Math.sin(this.wingPhase));

    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.bodyAngle);

    const wingFill = `hsl(${this.hue}, 75%, 58%)`;
    const wingFill2 = `hsl(${this.hue + 25}, 70%, 68%)`;
    const wingStroke = `hsl(${this.hue}, 50%, 35%)`;

    ctx.lineWidth = 0.6;

    // Upper wings (left, right)
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.scale(side * flap, 1);
      ctx.fillStyle = wingFill;
      ctx.strokeStyle = wingStroke;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.25, -s * 1.1, s * 1.2, -s * 0.9, s * 0.85, s * 0.25);
      ctx.bezierCurveTo(s * 0.5, s * 0.55, s * 0.1, s * 0.3, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Lower wings (left, right)
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.scale(side * flap, 1);
      ctx.fillStyle = wingFill2;
      ctx.strokeStyle = wingStroke;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.3, s * 0.7, s * 0.85, s * 0.75, s * 0.6, s * 0.2);
      ctx.bezierCurveTo(s * 0.45, s * 0.1, s * 0.1, s * 0.15, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Body
    ctx.fillStyle = `hsl(${this.hue}, 40%, 22%)`;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.1, s * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Whether this butterfly has faded out and should be removed.
   * @returns {boolean}
   */
  get dead() {
    return this.alpha <= 0;
  }
}

/**
 * Main animation loop — clears the canvas, updates and draws all particles.
 * @returns {void}
 */
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  butterflies = butterflies.filter(b => !b.dead);
  for (const b of butterflies) {
    b.update();
    b.draw(ctx);
  }
  rafId = requestAnimationFrame(loop);
}

/**
 * Sync canvas pixel dimensions to the current window size.
 * @returns {void}
 */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Set up the canvas as a fixed full-viewport overlay and start the RAF loop.
 * The canvas receives pointer-events:none so it never blocks clicks.
 * @param {HTMLCanvasElement} c - The canvas element to use.
 * @returns {void}
 */
export function init(c) {
  canvas = c;
  ctx = canvas.getContext('2d');

  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    pointerEvents: 'none',
    zIndex: '9999',
  });

  resize();
  window.addEventListener('resize', resize);
  rafId = requestAnimationFrame(loop);
}

/**
 * Spawn n butterfly particles at (x, y) with randomised burst velocity.
 * Uses the hue set by the most recent setColor call.
 * @param {number} x - X coordinate in viewport space.
 * @param {number} y - Y coordinate in viewport space.
 * @param {number} n - Number of butterflies to spawn.
 * @returns {void}
 */
export function scatter(x, y, n) {
  for (let i = 0; i < n; i++) {
    butterflies.push(new Butterfly(x, y, currentHue));
  }
}

/**
 * Set the HSL hue used for the next scatter() call.
 * @param {number} hue - Hue value in [0, 360].
 * @returns {void}
 */
export function setColor(hue) {
  currentHue = hue;
}

/**
 * Cancel the animation loop, remove the canvas from the DOM,
 * and clean up all event listeners.
 * @returns {void}
 */
export function destroy() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  window.removeEventListener('resize', resize);
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = null;
  ctx = null;
  butterflies = [];
}
