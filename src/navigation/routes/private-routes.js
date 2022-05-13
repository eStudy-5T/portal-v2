import EnrolledCourses from '../../pages/enrolled-courses/EnrolledCourses'
import VerifyAccountPage from '../../pages/verify-account-page/VerifyAccountPage'


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
  }
]

export default privateRoutes
