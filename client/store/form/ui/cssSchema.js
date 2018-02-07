// for readability
// turn this into a schema generator and output schema object
// write function that takes in name, selectors, css property, basedOn...etc and then
// add them to schema

export const css = {
  labelAlignment: {
    value: 'top',
    responsibleFor: ['descriptionPositionRight', 'descriptionMarginTop']
  },
  descriptionPositionLeft: {
    cssProperty: 'left',
    derived: {
      basedOn: 'labelAlignment',
      type: 'enum',
      top: {
        value: 'inherit'
      },
      left: {
        basedOn: 'labelMinWidth',
        type: 'base',
        delta: 15,
        unit: 'px'
      },
      right: {
        basedOn: 'labelMinWidth',
        type: 'base',
        delta: 15,
        unit: 'px'
      },
      value: 'inherit',
      unit: 'px',
    },
    selectors: ['.help-block'],
  },
  descriptionMarginTop: {
    cssProperty: 'margin-top',
    derived: {
      basedOn: 'labelAlignment',
      type: 'enum',
      top: {
        value: 0,
        unit: 'px'
      },
      left: {
        basedOn: 'fontSize',
        type: 'base',
        multiplier: 2,
        delta: 0,
        unit: 'px'
      },
      right: {
        basedOn: 'fontSize',
        type: 'base',
        multiplier: 2,
        delta: 0,
        unit: 'px'
      },
      value: 0,
      unit: 'px'
    },
    selectors: ['.help-block'],
  },
  fieldMarginBottom: {
    cssProperty: 'margin-bottom',
    derived: {
      basedOn: 'fontSize',
      type: 'base',
      multiplier: 2,
      delta: 8,
      unit: 'px',
      value: 36,
    },
    selectors: ['.form-group.field__default-bootstrap'],
  },
  labelVerticalAlignment: {
    cssProperty: 'align-self',
    selectors: ['.control-label'],
    value: 'center'
  },
  labelMinWidth: {
    cssProperty: 'min-width',
    selectors: ['.control-label'],
    value: 62,
    unit: 'px'
  },
  fontSize: {
    cssProperty: 'font-size',
    value: 14,
    unit: 'px',
    selectors: ['.help-block', '.form-control', '.control-label', 'checkboxTop', 'checkTop', 'descriptionMarginTop', 'fieldMarginBottom']
  },
  height: {
    cssProperty: 'height',
    derived: {
      basedOn: 'fontSize',
      type: 'base',
      delta: 20,
      unit: 'px',
      value: 34
    },
    selectors: ['.form-control']
  },
  lineHeight: {
    cssProperty: 'line-height',
    derived: {
      basedOn: 'fontSize',
      type: 'base',
      delta: 3,
      unit: 'px',
      value: 17
    },
    selectors: ['.form-control', '.control-label']
  },
  checkboxLabel: {
    cssProperty: 'font-size',
    selectors: ['.checkboxes .checkbox label span span', '.field-radio-group .radio label span span'],
    derived: {
      basedOn: 'fontSize',
      type: 'base',
      delta: 0,
      unit: 'px',
      value: 14
    },
  },
  labelPadding: {
    prefix: 'padding',
    applyTo: {
      all: true,
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
    all: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    top: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    bottom: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    left: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    right: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    selectors: ['.control-label'],
  },
  labelBorder: {
    prefix: 'border',
    suffix: true,
    applyTo: {
      all: true,
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
    all: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    top: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    bottom: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    left: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    right: {
      width: {
        value: 0,
        unit: 'px',
      }
    },
    selectors: ['.control-label']
  },
  labelBorderStyle: {
    cssProperty: 'border-style',
    selectors: ['.control-label'],
    value: 'solid',
  },
  labelBorderRadius: {
    cssProperty: 'border-radius',
    selectors: ['.control-label'],
    value: 0,
    unit: 'px'
  },
  labelBorderColor: {
    cssProperty: 'border-color',
    selectors: ['.control-label'],
    value: '#555555',
  },
  labelColor: {
    cssProperty: 'color',
    selectors: ['.control-label'],
    value: '#555555',
  },
  labelBackgroundColor: {
    cssProperty: 'background-color',
    selectors: ['.control-label'],
    value: '#ffffff',
  },
  fieldBorder: {
    prefix: 'border',
    suffix: true,
    applyTo: {
      all: true,
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
    all: {
      width: {
        value: 1,
        unit: 'px',
      }
    },
    top: {
      width: {
        value: 1,
        unit: 'px',
      }
    },
    bottom: {
      width: {
        value: 1,
        unit: 'px',
      }
    },
    left: {
      width: {
        value: 1,
        unit: 'px',
      }
    },
    right: {
      width: {
        value: 1,
        unit: 'px',
      }
    },
    selectors: ['.field__default-bootstrap.form-group .form-control']
  },
  fieldBorderStyle: {
    cssProperty: 'border-style',
    selectors: ['.field__default-bootstrap.form-group .form-control'],
    value: 'solid',
  },
  fieldBorderRadius: {
    cssProperty: 'border-radius',
    selectors: ['.field__default-bootstrap.form-group .form-control'],
    value: 4,
    unit: 'px'
  },
  fieldBorderColor: {
    cssProperty: 'border-color',
    selectors: ['.field__default-bootstrap.form-group .form-control'],
    value: '#cccccc',
  },
  fieldColor: {
    cssProperty: 'color',
    selectors: ['.field__default-bootstrap.form-group .form-control'],
    value: '#555555',
  },
  fieldBackgroundColor: {
    cssProperty: 'background-color',
    selectors: ['.field__default-bootstrap.form-group .form-control'],
    value: '#ffffff',
  },
}
