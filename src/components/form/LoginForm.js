import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div className="login-form-box bg-color-white">
      <div className="logo">
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <img
            className="logo-light"
            src="/images/logo/logo.png"
            alt="Main Logo"
          />
        </Link>
      </div>
      <h3 className="mb-30 text-center fs-35">Login</h3>
      <form className="login-form" action="#">
        <div className="input-box mb--30">
          <input type="text" placeholder="Email" />
        </div>
        <div className="input-box mb--30">
          <input type="password" placeholder="Password" />
        </div>
        <div className="comment-form-consent input-box mb--30">
          <input id="checkbox-1" type="checkbox" />
          <label htmlFor="checkbox-1">Remember Me</label>
        </div>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>Login</span>
        </button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div className="input-box mb--20">
            <Link to="/forgot-password">Can not login?</Link>
          </div>
          <div className="input-box">
            <Link to="/register">Don't have account?</Link>
          </div>
        </Box>
      </form>
    </div>
  )
}

export default LoginForm
