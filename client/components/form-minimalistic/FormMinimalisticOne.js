import './FormMinimalisticOne.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class FormMinimalisticOne extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {
    return (
      <div className="form__minimalistic-one">
        <h3 className="form__title">Leave a message.</h3>
        <p className="form__introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat tincidunt fermentum.</p>
        <div className="form__inner" role="form">
          <div className="form-fields">
            <div className="form-text">
              <input type="text" className="form-text__input" value="" placeholder="Name" required="" />
              <div className="form-text__border">
                <div className="form-text__indicator"></div>
                <div className="form-text__indicator"></div>
              </div>
            </div>
            <div className="form-text">
              <input type="email" className="form-text__input" value="" placeholder="Email" required="" />
              <div className="form-text__border">
                <div className="form-text__indicator"></div>
                <div className="form-text__indicator"></div>
              </div>
            </div>
            <div className="form-text">
              <input type="text" className="form-text__input" value="" placeholder="Telephone" />
              <div className="form-text__border">
                <div className="form-text__indicator"></div>
                <div className="form-text__indicator"></div>
              </div>
            </div>
            <div className="form-textarea">
              <textarea className="form-textarea__textarea" type="text" placeholder="How can we help?" required="" max="1024" rows="1" style={{overflow: 'hidden', wordWrap: 'breakWord', height: '58px'}}></textarea>
              <div className="form-textarea__border">
                <div className="form-textarea__indicator"></div>
                <div className="form-textarea__indicator"></div>
              </div>
            </div>
            <div></div>
          </div>
          <button className="form__submit">Submit</button>
        </div>
      </div>
    )
  }
}

FormMinimalisticOne.propTypes = {

}

export default FormMinimalisticOne
