/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import ScrollTopButton from './ScrollTopButton'

function Footer() {
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
                  <ul className="social-share mt--30">
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
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ Question</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
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
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/pricing">Pricing Plan</Link>
                      </li>
                      <li>
                        <Link to="/purchase-guide">Purchase Guide</Link>
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

export default Footer
