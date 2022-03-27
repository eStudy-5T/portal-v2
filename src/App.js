import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/scroll-to-top/ScrollToTop'
import AboutUsOne from './pages/inner-page/AboutUsOne'
import AboutUsTwo from './pages/inner-page/AboutUsTwo'
import AboutUsThree from './pages/inner-page/AboutUsThree'
import BlogGridOne from './pages/blog/BlogGridOne'
import BlogGridTwo from './pages/blog/BlogGridTwo'
import BlogGridThree from './pages/blog/BlogGridThree'
import BlogCarousel from './pages/blog/BlogCarousel'
import BlogLoadMore from './pages/blog/BlogLoadMore'
import BlogStandard from './pages/blog/BlogStandard'
import BlogGridRightSidebar from './pages/blog/BlogGridRightSidebar'
import BlogGridLeftSidebar from './pages/blog/BlogGridLeftSidebar'
import BlogDetailsOne from './pages/details-page/BlogDetailsOne'
import BlogDetailsTwo from './pages/details-page/BlogDetailsTwo'
import BlogDetailsThree from './pages/details-page/BlogDetailsThree'
import CategoryArchive from './pages/archive/CategoryArchive'
import TagArchive from './pages/archive/TagArchive'
import AuthorArchive from './pages/archive/AuthorArchive'
import ComingSoon from './pages/inner-page/ComingSoon'
import ContactMe from './pages/inner-page/ContactMe'
import ContactUs from './pages/inner-page/ContactUs'
import CourseOne from './pages/course/CourseOne'
import CourseTwo from './pages/course/CourseTwo'
import CourseThree from './pages/course/CourseThree'
import CourseFour from './pages/course/CourseFour'
import CourseFive from './pages/course/CourseFive'
import CourseFilterOne from './pages/course/CourseFilterOne'
import CourseFilterTwo from './pages/course/CourseFilterTwo'
import CourseCarousel from './pages/course/CourseCarousel'
import CourseLoadMore from './pages/course/CourseLoadMore'
import CourseCategoryArchive from './pages/archive/CourseCategoryArchive'
import CourseDetails from './pages/details-page/CourseDetails'
import CourseDetailsTwo from './pages/details-page/CourseDetailsTwo'
import EventGrid from './pages/inner-page/EventGrid'
import EventList from './pages/inner-page/EventList'
import EventLoadMore from './pages/inner-page/EventLoadMore'
import EventCarousel from './pages/inner-page/EventCarousel'
import EventDetails from './pages/details-page/EventDetails'
import Faq from './pages/inner-page/Faq'
import GalleryGrid from './pages/inner-page/GalleryGrid'
import GalleryMasonry from './pages/inner-page/GalleryMasonry'
import GalleryLoadMore from './pages/inner-page/GalleryLoadMore'
import HomeOne from './pages/home-page/HomeOne'
import HomeTwo from './pages/home-page/HomeTwo'
import HomeThree from './pages/home-page/HomeThree'
import HomeFour from './pages/home-page/HomeFour'
import HomeFive from './pages/home-page/HomeFive'
import InstructorPageOne from './pages/inner-page/InstructorPageOne'
import InstructorPageTwo from './pages/inner-page/InstructorPageTwo'
import InstructorPageThree from './pages/inner-page/InstructorPageThree'
import LoginRegister from './pages/inner-page/LoginRegister'
import Pricing from './pages/inner-page/Pricing'
import PrivacyPolicy from './pages/inner-page/PrivacyPolicy'
import PurchaseGuide from './pages/inner-page/PurchaseGuide'
import Testimonial from './pages/inner-page/Testimonial'
import InstructorDetails from './pages/details-page/InstructorDetails'
import Error from './pages/inner-page/Error'

// Import Css Here
import './assets/scss/style.scss'

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<HomeOne />} />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/home-2`}`}
            element={<HomeTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/home-3`}`}
            element={<HomeThree />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/home-4`}`}
            element={<HomeFour />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/home-5`}`}
            element={<HomeFive />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/about-us-1`}`}
            element={<AboutUsOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/about-us-2`}`}
            element={<AboutUsTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/about-us-3`}`}
            element={<AboutUsThree />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/coming-soon`}`}
            element={<ComingSoon />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/contact-me`}`}
            element={<ContactMe />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/contact-us`}`}
            element={<ContactUs />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-1`}`}
            element={<CourseOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-2`}`}
            element={<CourseTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-3`}`}
            element={<CourseThree />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-4`}`}
            element={<CourseFour />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-5`}`}
            element={<CourseFive />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-filter-1`}`}
            element={<CourseFilterOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-filter-2`}`}
            element={<CourseFilterTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-carousel`}`}
            element={<CourseCarousel />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-load-more`}`}
            element={<CourseLoadMore />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-category/:slug`}`}
            element={<CourseCategoryArchive />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-details/:id`}`}
            element={<CourseDetails />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/course-details-two/:id`}`}
            element={<CourseDetailsTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/event-grid`}`}
            element={<EventGrid />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/event-list`}`}
            element={<EventList />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/event-load-more`}`}
            element={<EventLoadMore />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/event-carousel`}`}
            element={<EventCarousel />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/event-details/:id`}`}
            element={<EventDetails />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/faq`}`}
            element={<Faq />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/gallery-grid`}`}
            element={<GalleryGrid />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/gallery-masonry`}`}
            element={<GalleryMasonry />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/gallery-load-more`}`}
            element={<GalleryLoadMore />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/instructor-one`}`}
            element={<InstructorPageOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/instructor-two`}`}
            element={<InstructorPageTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/instructor-three`}`}
            element={<InstructorPageThree />}
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
            path={`${`${process.env.PUBLIC_URL}/blog-grid-1`}`}
            element={<BlogGridOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-grid-2`}`}
            element={<BlogGridTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-grid-3`}`}
            element={<BlogGridThree />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-carousel`}`}
            element={<BlogCarousel />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-load-more`}`}
            element={<BlogLoadMore />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-standard`}`}
            element={<BlogStandard />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-grid-right-sidebar`}`}
            element={<BlogGridRightSidebar />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-grid-left-sidebar`}`}
            element={<BlogGridLeftSidebar />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/login-register`}`}
            element={<LoginRegister />}
          />

          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-details/:id`}`}
            element={<BlogDetailsOne />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-details-left-sidebar/:id`}`}
            element={<BlogDetailsTwo />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/blog-details-right-sidebar/:id`}`}
            element={<BlogDetailsThree />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/category/:slug`}`}
            element={<CategoryArchive />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/tag/:slug`}`}
            element={<TagArchive />}
          />
          <Route
            exact
            path={`${`${process.env.PUBLIC_URL}/author/:slug`}`}
            element={<AuthorArchive />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App
