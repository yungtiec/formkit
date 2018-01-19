import React, {Component} from 'react'
import autoBind from 'react-autobind';
import _ from 'lodash'

export default class TextInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.formData};
    autoBind(this);

  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value
      }, () => this.props.onChange(this.state));
    };
  }

  render() {
    console.log('??',this.props)
    const key = _.keys(this.state)[0];
    return (
      <div className="">
        <label className="field__label">{this.props.schema.title}</label>
        <div className="input-group">
          <input type="text" value={this.state[key]} onChange={this.onChange(key)} />
        </div>
      </div>
    );
  }
}
