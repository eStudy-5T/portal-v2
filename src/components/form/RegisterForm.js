import React from 'react'
import { Link } from 'react-router-dom'

function RegisterForm() {
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
      <h3 className="mb-30 text-center fs-35">Register</h3>
      <form className="login-form" action="#">
        <div className="input-box mb--30">
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="input-box mb--30">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-box mb--30">
          <input type="password" placeholder="Password" />
        </div>
        <div className="input-box">
          <input id="checkbox-2" type="checkbox" />
          <label htmlFor="checkbox-2">
            I read & agree the terms & conditions.
          </label>
        </div>
        <button className="rn-btn edu-btn w-100 mt--30" type="submit">
          <span>Register</span>
        </button>
      </form>
      <div className="input-box mt--30">
        <Link to="/login">Already have account?</Link>
      </div>
    </div>
  )
}

export default RegisterForm
