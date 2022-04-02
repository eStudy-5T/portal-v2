import React from 'react'

function LoginForm() {
  return (
    <div className="login-form-box">
      <h3 className="mb-30">Forgot Password</h3>
      <form className="login-form" action="#">
        <div className="input-box mb--30">
          <input type="text" placeholder="Username or Email" />
        </div>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>Send Email</span>
        </button>
        <div className="input-box mb--20">
          <a href="/login">Try to login again?</a>
        </div>
        <div className="input-box">
          <a href="/register">Or not have an account?</a>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
