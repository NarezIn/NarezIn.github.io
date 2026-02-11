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
