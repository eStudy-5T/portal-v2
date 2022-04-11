import React from 'react'
import Login from '../../pages/login-page/Login'
import Register from '../../pages/register-page/Register'
import ForgotPassword from '../../pages/forgot-password-page/ForgotPassword'

const restrictedRoutes = [
  {
    path: 'login',
    component: () => <Login />,
    exact: true
  },
  {
    path: 'register',
    component: () => <Register />,
    exact: true
  },
  {
    path: 'forgot-password',
    component: () => <ForgotPassword />,
    exact: true
  }
]

export default restrictedRoutes
