export default {
  text: {
    id: "text",
    icon: "bars",
    label: "Short text",
    jsonSchema: {
      type: "string",
      title: "Untitled short text input",
      description: "",
      default: ""
    },
    uiSchema: {
      "ui:field": "textinput",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          description: { type: "string", title: "Example value" },
          required: { type: "boolean" },
        }
      },
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
      description: "",
      default: ""
    },
    uiSchema: {
      "ui:widget": "textarea",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          description: { type: "string", title: "Example value" },
          required: { type: "boolean" },
        }
      },
    },
    formData: {}
  },
  "multiple-choices": {
    id: "multiple-choices",
    icon: "list-ui",
    label: "Multiple choices",
    jsonSchema: {
      type: "array",
      title: "Untitled multiple choices",
      items: {
        type: "string",
        enum: ["choice 1", "choice 2", "choice 3"],
      },
      uniqueItems: true,
    },
    uiSchema: {
      "ui:widget": "checkboxes",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          required: { type: "boolean" },
          items: {
            type: "object",
            title: "Choices",
            properties: {
              enum: {
                title: null,
                type: "array",
                items: {
                  type: "string"
                },
                default: ["choice 1", "choice 2", "choice 3"],
              }
            }
          }
        }
      },
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
      enum: ["option 1", "option 2", "option 3"],
    },
    uiSchema: {
      "ui:widget": "radio",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          required: { type: "boolean" },
          enum: {
            type: "array",
            title: "Options",
            items: {
              type: "string"
            }
          }
        }
      },
    },
    formData: {}
  },
  select: {
    id: "select",
    icon: "chevron-down",
    label: "Dropdown",
    jsonSchema: {
      type: "string",
      format: "string",
      title: "Untitled dropdown menu",
      enum: ["option 1", "option 2", "option 3"],
    },
    uiSchema: {
      "ui:widget": "select",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          required: { type: "boolean" },
          enum: {
            type: "array",
            title: "Options",
            items: {
              type: "string"
            }
          }
        }
      },
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
    },
    uiSchema: {
      "ui:widget": "alt-date",
      editSchema: {
        type: "object",
        properties: {
          title: { type: "string", title: "Label" },
          required: { type: "boolean" }
        }
      },
    },
    formData: {}
  }
}
