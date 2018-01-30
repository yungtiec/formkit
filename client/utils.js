import { XmlEntities } from 'html-entities'
import sanitizeHtml from 'sanitize-html'
import isHtml from 'is-html'

const entities = new XmlEntities();

export const doesBrowserSupportSVG = function() {
  return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
}

export const decodeAndSanitizeHtmlEntities = function(text) {
  var dirty = entities.decode(text)
  return isHtml(dirty) ? sanitizeHtml(dirty) : dirty.replace(/&nbsp;/g, ' ')
}
