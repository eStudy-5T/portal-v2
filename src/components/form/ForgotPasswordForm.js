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
      <h3 className="mb-30 text-center fs-35 mt--30">Forgot Password</h3>
      <form className="login-form" action="#">
        <div className="input-box mb--30">
          <input type="text" placeholder="Username or Email" />
        </div>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>Send Email</span>
        </button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div className="input-box mb--20">
            <Link to="/login">Try to login again?</Link>
          </div>
          <div className="input-box">
            <Link to="/register">Or not have an account?</Link>
          </div>
        </Box>
      </form>
    </div>
  )
}

export default LoginForm
