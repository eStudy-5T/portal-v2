import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Outlet, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

import { useTranslation } from 'react-i18next'

import Error from '../pages/page-not-found/Error'
import Loading from '../common/loading/Loading'

import PrivateRoute from './type/private-route'
import RestrictedRoute from './type/restricted-route'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'

import publicRoutes from './routes/public-routes'
import privateRoutes from './routes/private-routes'
import teacherRoutes from './routes/teacher-routes'
import restrictedRoutes from './routes/restricted-routes'

import userService from '../services/user-service'
import { userActions } from '../redux/store/user-info'
import useAuthenticate from '../hooks/use-authenticate'
import useVerify from '../hooks/use-verify'
import CreateTeacherProfile from '../pages/create-teacher-profile/CreateTeacherProfile'

const PublicRoute = () => {
  localStorage.setItem('currentUrl', window.location.pathname)
  return <Outlet />
}

const AppRouter = () => {
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [isAuthenticated] = useAuthenticate()
  const [isVerified] = useVerify()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t: translation } = useTranslation()
  const userInfo = useSelector((state) => state.userInfo)

  const fireVerifyAccountAlert = useCallback(
    () =>
      debounce(
        () => {
          toast.info(translation('auth.verifyAccountAlert'))
        },
        5000,
        { leading: true, trailing: false }
      ),
    [translation]
  )

  useEffect(() => {
    const userIdFromQuery = searchParams.get('userId')
    if (userIdFromQuery) {
      localStorage.setItem('currentUserId', userIdFromQuery)
      localStorage.setItem('loginTimestamp', Date.now() + 86400000) // 1 day
      searchParams.delete('userId')
      setSearchParams(searchParams)
    }

    const messageFromQuery = searchParams.get('message')
    if (messageFromQuery) {
      toast.error(translation(messageFromQuery))
      searchParams.delete('message')
      setSearchParams(searchParams)
    }

    if (
      isAuthenticated &&
      !isVerified &&
      !window.location.pathname.includes('verify')
    ) {
      fireVerifyAccountAlert()
    }
    async function fetchUserInfo() {
      const isLoginExpired =
        Date.now() > Number(localStorage.getItem('loginTimestamp') || 0)

      if (isLoginExpired) {
        localStorage.removeItem('currentUserId')
        localStorage.removeItem('currentUser')
      }

      const currentUserId = localStorage.getItem('currentUserId')
      if (currentUserId && !isAuthenticated) {
        setIsAppLoading(true)
        try {
          const { data: tempUserInfo } = await userService.fetchUserInfo(
            currentUserId
          )
          dispatch(userActions.setUserInfo(tempUserInfo))
          setIsAppLoading(false)
        } catch (err) {
          setIsAppLoading(false)
        }
      }
    }
    fetchUserInfo()
  }, [
    dispatch,
    isAuthenticated,
    isVerified,
    translation,
    searchParams,
    setSearchParams,
    fireVerifyAccountAlert
  ])

  return (
    <ScrollToTop>
      <Routes>
        {publicRoutes.map(({ component: Component, path, exact }) => (
          <Route path={`/${path}`} key={path} element={<PublicRoute />}>
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

        {/* Allow anonymous users only */}
        {restrictedRoutes.map(({ component: Component, path, exact }) => (
          <Route
            path={`/${path}`}
            key={path}
            element={<RestrictedRoute isAllow={!isAuthenticated} />}
          >
            <Route
              path={`/${path}`}
              key={path}
              exact={exact}
              element={isAppLoading ? <Loading /> : <Component />}
            />
          </Route>
        ))}

        {/* Allow teachers only */}
        {teacherRoutes.map(({ component: Component, path, exact }) => (
          <Route
            path={`/${path}`}
            key={path}
            element={<RestrictedRoute isAllow={userInfo.isVerifiedToTeach} />}
          >
            <Route
              path={`/${path}`}
              key={path}
              exact={exact}
              element={isAppLoading ? <Loading /> : <Component />}
            />
          </Route>
        ))}

        {/* Allow users that have not submitted teacher profile */}
        {[
          {
            path: 'submit-profile',
            component: () => <CreateTeacherProfile />,
            exact: true
          }
        ].map(({ component: Component, path, exact }) => (
          <Route
            path={`/${path}`}
            key={path}
            element={<RestrictedRoute isAllow={!userInfo.isSubmitted} />}
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
  )
}

export default AppRouter
