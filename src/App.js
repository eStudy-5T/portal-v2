import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/scroll-to-top/ScrollToTop'
import AboutUs from './pages/about-us/AboutUs'
import ComingSoon from './pages/coming-soon/ComingSoon'
import ContactUs from './pages/contact-us/ContactUs'
import Courses from './pages/course/Courses'
import CourseFilter from './pages/course/CourseFilter'
import CourseDetails from './pages/details-page/CourseDetails'
import Faq from './pages/faq-page/Faq'
import HomePage from './pages/home-page/HomePage'
import InstructorsPage from './pages/instructor-page/InstructorsPage'
import Login from './pages/login-page/Login'
import Register from './pages/register-page/Register'
import ForgotPassword from './pages/forgot-password-page/ForgotPassword'
import Pricing from './pages/pricing-page/Pricing'
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy'
import PurchaseGuide from './pages/purchase-guide/PurchaseGuide'
import Testimonial from './pages/testimonial/Testimonial'
import InstructorDetails from './pages/details-page/InstructorDetails'
import Error from './pages/page-not-found/Error'

// Import Css Here
import './assets/scss/style.scss'

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/about-us`}`}
            element={<AboutUs />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/coming-soon`}`}
            element={<ComingSoon />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/contact-us`}`}
            element={<ContactUs />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/courses`}`}
            element={<Courses />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-filter`}`}
            element={<CourseFilter />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-details/:id`}`}
            element={<CourseDetails />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/faq`}`}
            element={<Faq />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/instructors`}`}
            element={<InstructorsPage />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/pricing`}`}
            element={<Pricing />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/privacy-policy`}`}
            element={<PrivacyPolicy />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/purchase-guide`}`}
            element={<PurchaseGuide />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/testimonial`}`}
            element={<Testimonial />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/instructor-details/:slug`}`}
            element={<InstructorDetails />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/login`}`}
            element={<Login />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/register`}`}
            element={<Register />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/forgot-password`}`}
            element={<ForgotPassword />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App
