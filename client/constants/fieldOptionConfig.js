export default {
  text: {
    id: "text",
    icon: "bars",
    label: "Short text",
    jsonSchema: {
      type: "string",
      title: "test",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      classNames: "col-lg-12"
    },
    formData: {}
  },
  multilinetext: {
    id: "multilinetext",
    icon: "paragraph",
    label: "Long text",
    jsonSchema: {
      type: "string",
      title: "test",
      showDescription: false,
      description: "",
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:widget": "textarea",
      classNames: "col-lg-12"
    },
    formData: {}
  },
  "multiple-choice": {
    id: "multiple-choice",
    icon: "list",
    label: "Multiple choices",
    jsonSchema: {
      type: "array",
      title: "test",
      showDescription: false,
      items: {
        type: "string",
        enum: [""],
      },
      multiple: true,
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "checkboxes",
      classNames: "col-lg-12"
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
      title: "test",
      showDescription: false,
      enum: [""],
      traverseArray: ['title', '0']
    },
    uiSchema: {
      "ui:widget": "select",
      classNames: "col-lg-12"
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
      title: "test",
      showDescription: false,
      traverseArray: ['title']
    },
    uiSchema: {
      "ui:widget": "alt-date",
      classNames: "col-lg-12"
    },
    formData: {}
  }
}
