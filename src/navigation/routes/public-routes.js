import AboutUs from '../../pages/about-us/AboutUs'
import ComingSoon from '../../pages/coming-soon/ComingSoon'
import ContactUs from '../../pages/contact-us/ContactUs'
import Courses from '../../pages/course/Courses'
import CourseFilter from '../../pages/course/CourseFilter'
import CourseDetails from '../../pages/details-page/CourseDetails'
import Faq from '../../pages/faq-page/Faq'
import HomePage from '../../pages/home-page/HomePage'
import InstructorsPage from '../../pages/instructor-page/InstructorsPage'
import Pricing from '../../pages/pricing-page/Pricing'
import PrivacyPolicy from '../../pages/privacy-policy/PrivacyPolicy'
import PurchaseGuide from '../../pages/purchase-guide/PurchaseGuide'
import Testimonial from '../../pages/testimonial/Testimonial'
import InstructorDetails from '../../pages/details-page/InstructorDetails'

const publicRoutes = [
  {
    path: '',
    component: () => <HomePage />,
    exact: true
  },
  {
    path: 'about-us',
    component: () => <AboutUs />,
    exact: true
  },
  {
    path: 'coming-soon',
    component: () => <ComingSoon />,
    exact: true
  },
  {
    path: 'contact-us',
    component: () => <ContactUs />,
    exact: true
  },
  {
    path: 'courses',
    component: () => <Courses />,
    exact: true
  },
  {
    path: 'course-filter',
    component: () => <CourseFilter />,
    exact: true
  },
  {
    path: 'course-details/:id',
    component: () => <CourseDetails />,
    exact: true
  },
  {
    path: 'faq',
    component: () => <Faq />,
    exact: true
  },
  {
    path: 'instructors',
    component: () => <InstructorsPage />,
    exact: true
  },
  {
    path: 'pricing',
    component: () => <Pricing />,
    exact: true
  },
  {
    path: 'privacy-policy',
    component: () => <PrivacyPolicy />,
    exact: true
  },
  {
    path: 'purchase-guide',
    component: () => <PurchaseGuide />,
    exact: true
  },
  {
    path: 'testimonial',
    component: () => <Testimonial />,
    exact: true
  },
  {
    path: 'instructor-details/:id',
    component: () => <InstructorDetails />,
    exact: true
  }
]

export default publicRoutes
