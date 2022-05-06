import EnrolledCourses from '../../pages/enrolled-courses/EnrolledCourses'
import ManageUserPage from '../../pages/manage-user-page/ManageUserPage'
import VerifyAccountPage from '../../pages/verify-account-page/VerifyAccountPage'
import TeacherDashboard from '../../pages/teacher-dashboard/TeacherDashboard'
import NewCourse from '../../pages/new-course/NewCourse'

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
    path: 'teacher-dashboard',
    component: () => <TeacherDashboard />,
    exact: true
  },
  {
    path: 'new-course',
    component: () => <NewCourse />,
    exact: true
  }
]

export default privateRoutes
