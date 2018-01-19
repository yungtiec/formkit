# Google Form Parsing Note

label can be found in aria-label of the element: input, textarea

class of label div: freebirdFormviewerViewItemsItemItemTitle

radiogroup:
  div[role='listitem']
    second div
      first div's role, like role=radiogroup

look for hidden input for name and value in div[role='listitem']

start with input, textarea, radio, checkbox, dropdown



look for input
  yes =>
    look at type
      normal types like text, get name, value, aria-label
    hidden (radio, checkbox, dropdown)
      get name and value
      get extra info by traversing down its div[role='listitem']
