import React from 'react'
import { doesBrowserSupportSVG } from '../utils'
import { Link } from 'react-router-dom'

const Logo = props => {

  var logoSource = './assets/logo.svg'

  if (!doesBrowserSupportSVG()) {
    logoSource = './assets/logo.png'
  }

  return (
    <Link className="logo" to="/" style={{display: 'block', width: '200px', height: '50px', margin: '10px'}}>
      <img
        height="50px"
        className="logo__large"
        src={logoSource} />
    </Link>
  )
}

export default Logo
