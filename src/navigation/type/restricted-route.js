import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const RestrictedRoute = ({ isAuthenticated }) => {
  const currentUrl = localStorage.getItem('currentUrl')
  const location = useLocation()

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      state={{ from: location }}
      replace
      to={{
        pathname: currentUrl ? currentUrl : '/'
      }}
    />
  )
}

export default RestrictedRoute
