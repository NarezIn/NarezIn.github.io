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
