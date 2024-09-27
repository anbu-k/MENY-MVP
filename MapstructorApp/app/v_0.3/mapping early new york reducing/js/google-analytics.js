// Google Analytics

// Initializes the _gaq array if it doesn't already exist (used by Google Analytics to queue tracking commands)
var _gaq = _gaq || [];

// Sets up the google analytics account with the tracking ID
_gaq.push(["_setAccount", "UA-28801666-1"]);

// Tracks the intial page view when the script is loaded.
_gaq.push(["_trackPageview"]);

(function () {
  // Creates a new <script> element to load the google analytics script dynamically
  var ga = document.createElement("script");
  ga.type = "text/javascript"; // Sets the script type to JavaScript
  ga.async = true; // Loads the script asynchronously to avoid blocking page rendering
  
  // Sets the source of the script to the google analytics URL
  ga.src =
    ("https:" == document.location.protocol ? "https://ssl" : "http://www") +
    ".google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s); //Inserts the newly created google analytics script into the document, making sure it loads
})();
