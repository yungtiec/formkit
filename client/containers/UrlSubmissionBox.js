import './UrlSubmissionBox.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { fetchParsedForm } from '../store'
import PropTypes from 'prop-types';
import { FormMinimalisticOne } from '../components'

class UrlSubmissionBox extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleUrlSubmission(event) {
    event.preventDefault();
    const formUrl = event.target.formUrl.value;
    this.props.fetchParsedForm(formUrl)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleUrlSubmission}>
          <div className="form-row align-items-center justify-content-center">
            <div className="col-md-9 my-1 ml-1 mr-0 px-1">
              <input type="url" className="form-control" name="formUrl" id="formUrl" />
            </div>
            <div className="col-auto my-1 mr-1 ml-0 px-1">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
        <FormMinimalisticOne />
      </div>
    )
  }
}

UrlSubmissionBox.propTypes = {
  fetchParsedForm: PropTypes.func.isRequired
}

const mapState = (state) => ({})

const actions = { fetchParsedForm }

export default connect(mapState, actions)(UrlSubmissionBox)
