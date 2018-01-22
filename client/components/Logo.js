import React from 'react'
import { doesBrowserSupportSVG } from '../utils'
import { Link } from 'react-router-dom'

const Logo = props => {
  const style = {
    display: 'block',
    width: '130px',
    height: '50px',
    margin: '20px 20px 50px'
  }

  var logoSource = './assets/logo.svg'

  if (!doesBrowserSupportSVG()) {
    logoSource = './assets/logo.png'
  }

  return (
    <Link className="logo" to="/" style={style}>
      <img
        height="50px"
        className="logo__large"
        src={logoSource} />
    </Link>
  )
}

export default Logo
