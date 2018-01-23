### Assignee Tasks

- [x] added description input
- [x] added option inputs
- [ ] figure a way to navigate all the input in the DOM tree of the editing panel

### Proposed solution for keyboard navigation

We keep track of `currentPropertyInFocus` in redux just like we did with `currentFieldIdInFocus`

For each field added, we create a `keyTraverseArray`. For example, for a text input field with title and description, the array will look like `['title', 'description']`. For list-like field the array will look like `['title', 'option1', 'option2']`.

The default array for each new non-list-like field is `['title']`. The default array for each new list-like field is `['title', 'option1']`.

We can change the `currentPropertyInFocus` according to the `keyTraverseArray`.

Each EditableDiv will have a identifier like `fieldId + fieldOptionId + #option`. For every render cycle, EditableDiv check `currentPropertyInFocus`

Need to be careful when removing list option.

---

*Your PR Notes Here*
