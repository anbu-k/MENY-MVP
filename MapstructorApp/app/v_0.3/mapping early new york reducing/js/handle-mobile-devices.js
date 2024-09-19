const browserTestRegexp =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i;

  // Tests if the current device's user matches the mobile devices defined in the regular expression
if (browserTestRegexp.test(navigator.userAgent)) {
  // true for mobile device
  console.warn("mobile device");
  console.warn("redirect");
  window.location.href = "./mobile.html"; // redirects to the mobile version of the site
} else {
  // false for not mobile device
  console.warn("not mobile device");
  if (window.innerWidth <= 670) {
    console.warn("but small size");
    console.warn("redirect");
    window.location.href = "./mobile.html";
  } else {
    console.warn("start");
    console.warn("load");
  }
}
