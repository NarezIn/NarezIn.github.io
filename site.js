// Pending revert timers, keyed by button id, so repeat clicks reset the clock
// instead of stacking up.
var flashTimers = {};

/**
 * Temporarily replace a .link-btn's label and tooltip text, then restore the
 * text it started out with.
 *
 * @param {string} btnId - The id of the .link-btn element.
 * @param {string} labelText - Text to show on the button while flashing.
 * @param {string} tooltipText - Text to show in the tooltip while flashing.
 * @param {number} duration - How long to keep the new text, in milliseconds.
 * @returns {void}
 */
function flashLabel(btnId, labelText, tooltipText, duration) {
    var btn = document.getElementById(btnId);
    var label = btn.querySelector('.link-label');
    var tooltip = btn.querySelector('.link-tooltip');

    // Record the resting text on the first flash only, so clicking again
    // mid-flash can't save the flashed text as the thing to restore.
    if (btn.dataset.restingLabel === undefined) {
        btn.dataset.restingLabel = label.textContent;
        btn.dataset.restingTooltip = tooltip.textContent;
    }
    clearTimeout(flashTimers[btnId]);

    label.textContent = labelText;
    tooltip.textContent = tooltipText;
    flashTimers[btnId] = setTimeout(function () {
        label.textContent = btn.dataset.restingLabel;
        tooltip.textContent = btn.dataset.restingTooltip;
    }, duration);
}

// Contact: copy my email to the clipboard and confirm it worked.
document.getElementById('contact-btn').addEventListener('click', function () {
    navigator.clipboard.writeText('zn2133@nyu.edu').then(function () {
        flashLabel('contact-btn', 'copied!', 'zn2133@nyu.edu copied to clipboard!', 2000);
    });
});

// Potpourri: the blog isn't built yet, so let visitors down gently.
document.getElementById('potpourri-btn').addEventListener('click', function () {
    flashLabel(
        'potpourri-btn',
        'coming soon!',
        "this isn't ready yet.",
        2500
    );
});

/**
 * Position a note's pop-up box: centred over its link, kept inside the screen, and
 * flipped below the link when there is no room above.
 *
 * @param {HTMLElement} note - The .note wrapper element.
 * @returns {void}
 */
function placeNote(note) {
    var pop = note.querySelector('.note-pop');
    var margin = 8;
    var viewWidth = document.documentElement.clientWidth;
    var noteRect = note.getBoundingClientRect();

    // Measure the box while it is parked at the screen's left edge. A box sticking out
    // past the right edge, even for one layout pass, makes phones widen the whole page.
    pop.classList.remove('below');
    pop.style.left = -noteRect.left + 'px';
    var wasHidden = getComputedStyle(pop).display === 'none';
    if (wasHidden) {
        // Hidden boxes are display: none; lay this one out invisibly just to measure it.
        pop.style.display = 'block';
        pop.style.visibility = 'hidden';
    }
    var rect = pop.getBoundingClientRect();
    if (wasHidden) {
        pop.style.display = '';
        pop.style.visibility = '';
    }

    var left = noteRect.left + noteRect.width / 2 - rect.width / 2;
    left = Math.min(left, viewWidth - margin - rect.width);
    left = Math.max(left, margin);
    pop.style.left = left - noteRect.left + 'px';
    if (rect.top < margin) {
        pop.classList.add('below');
    }
}

/**
 * Close a note that was pinned open by a click or tap.
 *
 * @param {HTMLElement} note - The .note wrapper element.
 * @returns {void}
 */
function closeNote(note) {
    note.classList.remove('open');
    note.querySelector('.note-trigger').setAttribute('aria-expanded', 'false');
}

// A pinned box should stay on screen if the window is resized or a phone is rotated.
window.addEventListener('resize', function () {
    document.querySelectorAll('.note.open').forEach(placeNote);
});

// Notes such as "[motivation]": hover or keyboard focus shows the box, and a click or tap
// pins it open (touch screens have no hover).
document.querySelectorAll('.note').forEach(function (note) {
    var trigger = note.querySelector('.note-trigger');
    note.addEventListener('mouseenter', function () {
        placeNote(note);
    });
    note.addEventListener('mouseleave', function () {
        note.classList.remove('hush');
    });
    trigger.addEventListener('focus', function () {
        placeNote(note);
    });
    trigger.addEventListener('blur', function () {
        note.classList.remove('hush');
    });
    trigger.addEventListener('click', function (event) {
        event.stopPropagation();
        note.classList.remove('hush');
        var open = note.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        if (open) {
            placeNote(note);
        }
    });
});

// Clicking anywhere else, or pressing Escape, closes any pinned note.
document.addEventListener('click', function (event) {
    document.querySelectorAll('.note.open').forEach(function (note) {
        if (!note.contains(event.target)) {
            closeNote(note);
        }
    });
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.note').forEach(function (note) {
            closeNote(note);
            note.classList.add('hush');
        });
    }
});

$( document ).ready(function() {
 if ($(window).width() < 863) {
     var tests = document.getElementsByClassName('projimg');
     $.each(tests, function (i, l) {
        l.style.cssFloat = "none";
        l.style.marginLeft = "auto";
        l.style.marginRight = "auto";
     });
         var tests = document.getElementsByClassName('project');
         $.each(tests, function (i, l) {
            l.style.maxWidth = "450px";
         });
             var tests = document.getElementsByClassName('projtext');
             $.each(tests, function (i, l) {
                l.style.marginLeft ="0px";
             });
        var tests = document.getElementsByClassName('projhd');
        $.each(tests, function (i, l) {
           l.style.textAlign = "center";
        });
   var tests = document.getElementsByClassName('projsub');
   $.each(tests, function (i, l) {
      l.style.textAlign = "center";
   });
var tests = document.getElementsByClassName('projdate');
$.each(tests, function (i, l) {
 l.style.textAlign = "center";
});
 }
});


$(window).resize(function() {
 if ($(window).width() < 863) {
     var tests = document.getElementsByClassName('projimg');
     $.each(tests, function (i, l) {
        l.style.cssFloat = "none";
        l.style.marginLeft = "auto";
        l.style.marginRight = "auto";
     });
         var tests = document.getElementsByClassName('project');
         $.each(tests, function (i, l) {
            l.style.maxWidth = "450px";
         });
             var tests = document.getElementsByClassName('projtext');
             $.each(tests, function (i, l) {
                l.style.marginLeft ="0px";
             });
        var tests = document.getElementsByClassName('projhd');
        $.each(tests, function (i, l) {
           l.style.textAlign = "center";
        });
   var tests = document.getElementsByClassName('projsub');
   $.each(tests, function (i, l) {
      l.style.textAlign = "center";
   });
var tests = document.getElementsByClassName('projdate');
$.each(tests, function (i, l) {
 l.style.textAlign = "center";
});
 }
  else {
      var tests = document.getElementsByClassName('projimg');
      $.each(tests, function (i, l) {
         l.style.cssFloat = "left";
      });
          var tests = document.getElementsByClassName('project');
          $.each(tests, function (i, l) {
             l.style.maxWidth = "700px";
          });

              var tests = document.getElementsByClassName('projtext');
              $.each(tests, function (i, l) {
                 l.style.marginLeft ="20px";
              });

         var tests = document.getElementsByClassName('projhd');
         $.each(tests, function (i, l) {
            l.style.textAlign = "left";
         });

                  var tests = document.getElementsByClassName('projsub');
                  $.each(tests, function (i, l) {
                     l.style.textAlign = "left";
                  });

                           var tests = document.getElementsByClassName('projdate');
                           $.each(tests, function (i, l) {
                              l.style.textAlign = "left";
                           });
  }
});
