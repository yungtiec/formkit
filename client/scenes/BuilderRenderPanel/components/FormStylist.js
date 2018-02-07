import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { keys, clone, isEmpty } from 'lodash'

export default class FormStylist extends Component {

  static propTypes = {
    cssSchema: PropTypes.object.isRequired
  }

  componentWillUpdate(props) {
    const cssSchema = clone(props.cssSchema);
    for (var item in cssSchema) {
      var elements = [];
      var cssPrefixes = {};
      var cssPrefixesForCleanup = {};
      var sides = [];
      var sidesCleanup = [];
      if (!('selectors' in cssSchema[item])) continue
      cssSchema[item].selectors.forEach(selector => {
        elements = document.querySelectorAll(`.form__default-bootstrap ${selector}`)
        if (!elements.length) return
        if ('applyTo' in cssSchema[item]) {
          if (cssSchema[item].applyTo.all) {
            for (var side in cssSchema[item].applyTo) {
              if (side !== 'all') cssPrefixes[side] = `${cssSchema[item].prefix}-${side}`
            }
          } else {
            for (var side in cssSchema[item].applyTo) {
              if (side !== 'all' && cssSchema[item].applyTo[side]) {
                cssPrefixes[side] = `${cssSchema[item].prefix}-${side}`
              } else if (side !== 'all' && !cssSchema[item].applyTo[side]) {
                cssPrefixesForCleanup[side] = `${cssSchema[item].prefix}-${side}`
              }
            }
          }
          if (!isEmpty(cssPrefixes)) {
            for (var side in cssPrefixes) {
              elements.forEach(el => {
                for (var property in cssSchema[item][side]) {
                  if (cssSchema[item].suffix) {
                    el.style[`${cssPrefixes[side]}-${property}`] = cssSchema[item][side][property].value
                  } else {
                    el.style[cssPrefixes[side]] = cssSchema[item][side][property].value
                  }
                }
              })
            }
          }
          if (!isEmpty(cssPrefixesForCleanup)) {
            for (var side in cssPrefixesForCleanup) {
              elements.forEach(el => {
                for (var property in cssSchema[item][side]) {
                  if (cssSchema[item].suffix) {
                    el.style[`${cssPrefixesForCleanup[side]}-${property}`] = '0px'
                  } else {
                    el.style[cssPrefixesForCleanup[side]] = '0px'
                  }
                }
              })
            }
          }

          // if ('suffixes' in cssSchema[item]) {
          //   for (var suffix in cssSchema[item].suffixes) {
          //     cssPrefixes.forEach(prefix => {
          //       elements.forEach(el => {
          //         el.style[`${prefix}-${suffix}`] = cssSchema[item].suffixes[suffix].value
          //       })
          //     })
          //     cssPrefixesForCleanup.forEach(prefix => {
          //       elements.forEach(el => {
          //         el.style[`${prefix}-width`] = '0px'
          //       })
          //     })
          //   }
          // } else {
          //   cssPrefixes.forEach(prefix => {
          //     elements.forEach(el => {
          //       el.style[prefix] = cssSchema[item].value
          //     })
          //   })
          //   cssPrefixesForCleanup.forEach(prefix => {
          //     elements.forEach(el => {
          //       el.style[prefix] = '0px'
          //     })
          //   })
          // }
        } else {
          elements.forEach(el => {
            el.style[cssSchema[item].cssProperty] = cssSchema[item].value
          })
        }
      })
    }
  }

  render() {
    return (
      this.props.children
    );
  }
}
