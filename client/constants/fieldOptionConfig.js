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
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12"
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
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
        htmlEncodedEnum: ["option 1"],
        enum: ["option 1"],
      },
      allowMultiple: true,
      uniqueItems: true,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "checkboxes",
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
      htmlEncodedEnum: ["option 1"],
      enum: ["option 1"],
      showDescription: false,
      allowMultiple: false,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "radio",
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
      enum: ["option 1"],
      htmlEncodedEnum: ["option 1"],
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "select",
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
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
      classNameDict: {
        column: "col-lg-12",
        theme: "field__default-bootstrap"
      },
      column: "12",
    },
    formData: {},
    default: true
  }
}
