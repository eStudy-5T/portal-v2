import TeacherDashboard from '../../pages/teacher-dashboard/TeacherDashboard'
import TeacherCourses from '../../pages/teacher-dashboard/TeacherCourses'
import NewCourse from '../../pages/new-course/NewCourse'
import EditCourse from '../../pages/edit-course/EditCourse'

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
  },
  {
    path: 'new-course',
    component: () => <NewCourse />,
    exact: true
  },
  {
    path: 'edit-course/:courseId',
    component: () => <EditCourse />,
    exact: true
  }
]

export default teacherRoutes
