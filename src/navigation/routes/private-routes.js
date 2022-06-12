import EnrolledCourses from '../../pages/enrolled-courses/EnrolledCourses'
import ManageUserPage from '../../pages/manage-user-page/ManageUserPage'
import VerifyAccountPage from '../../pages/verify-account-page/VerifyAccountPage'
import TeacherDashboard from '../../pages/teacher-dashboard/TeacherDashboard'
import NewCourse from '../../pages/new-course/NewCourse'
import AccountSetting from '../../pages/account-setting/AccountSetting'
import TeacherCourses from '../../pages/teacher-dashboard/TeacherCourses'
import store from '../../redux'

const isTeacher = store.getState().userInfo.isVerifiedToTeach

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
    path: 'new-course',
    component: () => <NewCourse />,
    exact: true
  },
  {
    path: 'account-setting',
    component: () => <AccountSetting />,
    exact: true
  }
]

const finalRoutes = isTeacher
  ? privateRoutes.concat([
      {
        path: 'teacher-dashboard',
        component: () => <TeacherDashboard />,
        exact: true
      },
      {
        path: 'teacher-courses',
        component: () => <TeacherCourses />,
        exact: true
      }
    ])
  : privateRoutes

export default finalRoutes
