export const doesBrowserSupportSVG = function() {
  return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
}
// detect devices
