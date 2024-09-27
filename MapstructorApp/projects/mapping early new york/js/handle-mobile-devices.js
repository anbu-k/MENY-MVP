// regular expression to test the user agent and detect if the browser is on a mobile device
const browserTestRegexp =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i;

// tests the user's device by checked the navigator.userAgent string against the regular expression
if (browserTestRegexp.test(navigator.userAgent)) {
  // true for mobile device
  console.warn("mobile device");
  console.warn("redirect");
  window.location.href = "./mobile.html";
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
