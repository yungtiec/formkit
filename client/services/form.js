import axios from 'axios';

export function getParsedForm(formUrl) {
  return axios.post(`/api/form/parse`, { formUrl }).then(res => res.data)
}
