import {
  IconCertificate,
  IconDashboard,
  IconSchool,
  IconList,
  IconUser
} from '@tabler/icons'

export const teacherTabs = [
  {
    href: '/teacher-dashboard',
    icon: <IconDashboard />,
    title: 'dashboard.dashboard'
  },
  {
    href: '/teacher-courses',
    icon: <IconList />,
    title: 'dashboard.courses'
  },
  {
    href: '/edit-teacher-profile',
    icon: <IconUser />,
    title: 'dashboard.teacherProfile'
  }
]

export const adminTabs = [
  {
    href: '/dashboard',
    icon: <IconDashboard></IconDashboard>,
    title: 'dashboard.dashboard'
  },
  {
    href: '/manage-users',
    icon: <IconSchool></IconSchool>,
    title: 'admin.manageUsers'
  },
  {
    href: '/manage-courses',
    icon: <IconCertificate></IconCertificate>,
    title: 'admin.manageCourses'
  }
]
