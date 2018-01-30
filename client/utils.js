import { XmlEntities } from 'html-entities'
import sanitizeHtml from 'sanitize-html'

const entities = new XmlEntities();

export const doesBrowserSupportSVG = function() {
  return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
}

export const decodeAndSanitizeHtmlEntities = function(text) {
  var dirty = entities.decode(text)
  var clean = sanitizeHtml(dirty, {
    allowedTags: [],
    allowedAttributes: []
  })
  return clean
}
