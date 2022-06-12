import TeacherDashboard from '../../pages/teacher-dashboard/TeacherDashboard'
import TeacherCourses from '../../pages/teacher-dashboard/TeacherCourses'

const teacherRoutes = [
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
]

export default teacherRoutes
