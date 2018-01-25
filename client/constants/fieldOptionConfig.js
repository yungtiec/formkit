export default {
  text: {
    id: "text",
    icon: "bars",
    label: "Short text",
    jsonSchema: {
      type: "string",
      title: "",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:field": "textinput",

    },
    formData: {}
  },
  multilinetext: {
    id: "multilinetext",
    icon: "paragraph",
    label: "Long text",
    jsonSchema: {
      type: "string",
      title: "",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:field": "textarea",
    },
    formData: {}
  },
  "multiple-choice": {
    id: "multiple-choice",
    icon: "list",
    label: "Multiple choices",
    jsonSchema: {
      type: "array",
      title: "",
      showDescription: false,
      enum: [""],
      multiple: true,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:field": "checkboxes",
      // multiple:true => checkboxes
      // multiple:false => radio
    },
    formData: {}
  },
  select: {
    id: "select",
    icon: "arrow-down",
    label: "Dropdown",
    jsonSchema: {
      type: "string",
      format: "string",
      title: "",
      showDescription: false,
      enum: [""],
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:field": "select",

    },
    formData: {}
  },
  date: {
    id: "date",
    icon: "calendar-o",
    label: "Date",
    jsonSchema: {
      type: "string",
      format: "date",
      title: "",
      showDescription: false,
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:field": "alt-date",

    },
    formData: {}
  }
}
