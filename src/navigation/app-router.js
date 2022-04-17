import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import { toast } from 'react-toastify'

import { useTranslation } from 'react-i18next'

import Error from '../pages/page-not-found/Error'
import Loading from '../common/loading/Loading'

import PrivateRoute from './type/private-route'
import RestrictedRoute from './type/restricted-route'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'

import publicRoutes from './routes/public-routes'
import privateRoutes from './routes/private-routes'
import restrictedRoutes from './routes/restricted-routes'

import userService from '../services/user-service'
import { userActions } from '../redux/store/user-info'
import useAuthenticate from '../hooks/use-authenticate'
import useVerify from '../hooks/use-verify'

const AppRouter = () => {
  const [isAppLoading, setIsAppLoading] = useState(false)
  const isAuthenticated = useAuthenticate()
  const isVerified = useVerify()
  const dispatch = useDispatch()
  const { t: translation } = useTranslation()

  useEffect(() => {
    if (
      isAuthenticated &&
      !isVerified &&
      !window.location.pathname.includes('verify')
    ) {
      toast.info(translation('auth.verifyAccountAlert'))
    }
    async function fetchUserInfo() {
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        setIsAppLoading(true)
        try {
          const { data: userInfo } = await userService.fetchUserInfo(
            currentUser
          )
          dispatch(userActions.setUserInfo(userInfo))
          setIsAppLoading(false)
        } catch (err) {
          setIsAppLoading(false)
        }
      }
    }
    fetchUserInfo()
  }, [dispatch, isAuthenticated, isVerified, translation])

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {publicRoutes.map(({ component: Component, path, exact }) => (
            <Route path={`/${path}`} key={path} element={<Outlet />}>
              <Route
                path={`/${path}`}
                key={path}
                exact={exact}
                element={isAppLoading ? <Loading /> : <Component />}
              />
            </Route>
          ))}

          {privateRoutes.map(({ component: Component, path, exact }) => (
            <Route
              path={`/${path}`}
              key={path}
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path={`/${path}`}
                key={path}
                exact={exact}
                element={isAppLoading ? <Loading /> : <Component />}
              />
            </Route>
          ))}

          {restrictedRoutes.map(({ component: Component, path, exact }) => (
            <Route
              path={`/${path}`}
              key={path}
              element={<RestrictedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path={`/${path}`}
                key={path}
                exact={exact}
                element={isAppLoading ? <Loading /> : <Component />}
              />
            </Route>
          ))}

          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default AppRouter
