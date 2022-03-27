import React from 'react'
import { Link } from 'react-router-dom'
import ScrollTopButton from './ScrollTopButton'

function FooterOne() {
  return (
    <>
      <footer className="letmeet-footer-one edu-footer footer-style-default">
        <div className="footer-top">
          <div className="container letmeet-animated-shape">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="edu-footer-widget">
                  <div className="logo">
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                      <img
                        className="logo-light"
                        src="/images/logo/logo-white.png"
                        alt="Footer Logo"
                      />
                    </Link>
                  </div>
                  <p className="description">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum.
                  </p>
                  <ul className="social-share">
                    <li>
                      <a href="#">
                        <i className="icon-Fb" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-Pinterest" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-Twitter" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="edu-footer-widget explore-widget">
                  <h5 className="widget-title">Explore</h5>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      <li>
                        <Link to="/about-us-1">
                          <i className="icon-Double-arrow" />
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/event-grid">
                          <i className="icon-Double-arrow" />
                          Upcoming Events
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog-standard">
                          <i className="icon-Double-arrow" />
                          Blog & News
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq">
                          <i className="icon-Double-arrow" />
                          FAQ Question
                        </Link>
                      </li>
                      <li>
                        <Link to="/testimonial">
                          <i className="icon-Double-arrow" />
                          Testimonial
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">
                          <i className="icon-Double-arrow" />
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="edu-footer-widget quick-link-widget">
                  <h5 className="widget-title">Useful Links</h5>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      <li>
                        <Link to="/contact-us">
                          <i className="icon-Double-arrow" />
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/pricing">
                          <i className="icon-Double-arrow" />
                          Pricing Plan
                        </Link>
                      </li>
                      <li>
                        <Link to="/instructor-details/james-carlson">
                          <i className="icon-Double-arrow" />
                          Instructor Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/purchase-guide">
                          <i className="icon-Double-arrow" />
                          Purchase Guide
                        </Link>
                      </li>
                      <li>
                        <Link to="/course-1">
                          <i className="icon-Double-arrow" />
                          Popular Courses
                        </Link>
                      </li>
                      <li>
                        <Link to="/event-details/1">
                          <i className="icon-Double-arrow" />
                          Event Details
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="edu-footer-widget">
                  <h5 className="widget-title">Contact Info</h5>
                  <div className="inner">
                    <div className="widget-information">
                      <ul className="information-list">
                        <li>
                          <i className="icon-map-pin-line" />
                          VNU-HCMUS
                        </li>
                        <li>
                          <i className="icon-phone-fill" />
                          <a href="tel: + 1 (237) 382-2840">
                            + 1 (237) 382-2840
                          </a>
                        </li>
                        <li>
                          <i className="icon-mail-line-2" />
                          <a
                            target="_blank"
                            href="mailto:letmeethcmus@gmail.com"
                            rel="noreferrer"
                          >
                            letmeethcmus@gmail.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shape-dot-wrapper shape-wrapper d-md-block d-none">
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-21-01.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src="/images/shapes/shape-35.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTopButton />
    </>
  )
}

export default FooterOne
