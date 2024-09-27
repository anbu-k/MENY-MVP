// Google Analytics
var _gaq = _gaq || [];

// sets the Google Analytics account ID to track the website's analytics data
_gaq.push(["_setAccount", "UA-28801666-1"]);

// tracks a page view event, which logs the current page view to Google Analytics
_gaq.push(["_trackPageview"]);

// immediately invokes function expression to asynchronously load the Google Analytics script
(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src =
    ("https:" == document.location.protocol ? "https://ssl" : "http://www") +
    ".google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];

  // inserts the newly created Google Analytics script before the first script tag in the document
  // This ensures that the GA script is loaded and executed
  s.parentNode.insertBefore(ga, s);
})();
