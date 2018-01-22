export default {
  text: {
    id: "text",
    icon: "bars",
    label: "Short text",
    jsonSchema: {
      type: "string",
      title: "Untitled short text input",
      showDescription: false,
      description: "",
      default: ""
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
      title: "Untitled long text input",
      showDescription: false,
      description: "",
      default: ""
    },
    uiSchema: {
      "ui:field": "textarea",

    },
    formData: {}
  },
  "multiple-choices": {
    id: "multiple-choices",
    icon: "list",
    label: "Multiple choices",
    jsonSchema: {
      type: "array",
      title: "Untitled multiple choices",
      showDescription: false,
      items: {
        type: "string",
        enum: ["choice 1", "choice 2", "choice 3"],
      },
      uniqueItems: true,
    },
    uiSchema: {
      "ui:field": "checkboxes",

    },
    formData: {}
  },
  "multiple-choice": {
    id: "multiple-choice",
    icon: "check",
    label: "Multiple choice",
    jsonSchema: {
      type: "string",
      title: "Untitled multiple choice",
      showDescription: false,
      enum: ["option 1", "option 2", "option 3"],
    },
    uiSchema: {
      "ui:field": "radio",

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
      title: "Untitled dropdown menu",
      showDescription: false,
      enum: ["option 1", "option 2", "option 3"],
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
      title: "Untitled date picker",
      showDescription: false,
    },
    uiSchema: {
      "ui:field": "alt-date",

    },
    formData: {}
  }
}
