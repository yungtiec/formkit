export default {
  double: {
    id: "double",
    icon: "circle-o",
    label: "Number",
    jsonSchema: {
      type: "number",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      isInteger: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: false
  },
  integer: {
    id: "integer",
    icon: "clone",
    label: "Number",
    jsonSchema: {
      type: "integer",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      isInteger: true,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      classNames: "col-lg-12 field__default-bootstrap",
      "ui:widget": "updown"
    },
    formData: {},
    default: true
  },
  text: {
    id: "text",
    icon: "bars",
    label: "Short text",
    jsonSchema: {
      type: "string",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: true
  },
  multilinetext: {
    id: "multilinetext",
    icon: "paragraph",
    label: "Long text",
    jsonSchema: {
      type: "string",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:widget": "textarea",
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: true
  },
  "multiple-checkbox": {
    id: "multiple-checkbox",
    icon: "list",
    label: "Multiple choice",
    jsonSchema: {
      type: "array",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      items: {
        type: "string",
        enum: ["option 1"],
      },
      allowMultiple: true,
      uniqueItems: true,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "checkboxes",
      classNames: "col-lg-12 field__default-bootstrap"
      // multiple:true => checkboxes
      // multiple:false => radio
    },
    formData: {},
    default: true
  },
  radiobuttonlist: {
    id: "radiobuttonlist",
    icon: "list",
    label: "Multiple choice",
    jsonSchema: {
      type: "string",
      title: "test",
      htmlEncodedTitle: "test",
      enum: ["option 1"],
      showDescription: false,
      allowMultiple: false,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "radio",
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: false
  },
  select: {
    id: "select",
    icon: "arrow-down",
    label: "Dropdown",
    jsonSchema: {
      type: "string",
      format: "string",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      enum: [""],
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "select",
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: true
  },
  date: {
    id: "date",
    icon: "calendar-o",
    label: "Date",
    jsonSchema: {
      type: "string",
      format: "date",
      title: "test",
      htmlEncodedTitle: "test",
      showDescription: false,
      traverseArray: ['title'],
      "format": "date"
    },
    uiSchema: {
      classNames: "col-lg-12 field__default-bootstrap"
    },
    formData: {},
    default: true
  }
}
