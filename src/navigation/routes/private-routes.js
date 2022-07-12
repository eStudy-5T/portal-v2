import EnrolledCourses from '../../pages/enrolled-courses/EnrolledCourses'
import ManageUserPage from '../../pages/manage-user-page/ManageUserPage'
import VerifyAccountPage from '../../pages/verify-account-page/VerifyAccountPage'
import AccountSetting from '../../pages/account-setting/AccountSetting'

const privateRoutes = [
  {
    path: 'verify/:verifyToken',
    component: () => <VerifyAccountPage />,
    exact: true
  },
  {
    path: 'enrolled-courses/:userId',
    component: () => <EnrolledCourses />,
    exact: true
  },
  {
    path: 'manage-users',
    component: () => <ManageUserPage />
  },
  {
    path: 'account-setting',
    component: () => <AccountSetting />,
    exact: true
  },
  {
    path: 'account-setting',
    component: () => <AccountSetting />,
    exact: true
  }
]

export default privateRoutes
