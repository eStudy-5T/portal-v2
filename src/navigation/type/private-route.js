import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated }) => {
  localStorage.setItem('currentUrl', window.location.pathname)
  const location = useLocation()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      state={{ from: location }}
      replace
      to={{
        pathname: '/login'
      }}
    />
  )
}

export default PrivateRoute
