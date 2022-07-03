import React from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../section-title/SectionTitle'

function CallToAction() {
  return (
    <div className="edu-newsletter-area bg-image newsletter-style-3 edu-section-gap bg-color-primary">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="inner">
              <SectionTitle
                classes="text-white text-start"
                slogan="Let Us Help"
                title="Starting Your Plan"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="newsletter-right-content d-flex d-sm-flex align-items-center justify-content-start justify-content-lg-end">
              <div className="contact-btn mr--20">
                <Link className="edu-btn btn-white" to="/courses">
                  Get Started Now
                  <i className="icon-arrow-right-line-right" />
                </Link>
              </div>
              <div className="contact-btn">
                <Link className="edu-btn btn-white" to="/create-profile">
                  Become Teacher
                  <i className="icon-arrow-right-line-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
