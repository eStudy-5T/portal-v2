import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import ContactUsForm from '../../components/contact/ContactUsForm'
import GoogleMap from '../../components/contact/GoogleMap'

function ContactUs() {
  return (
    <>
      <SEO title="Contact Us" />
      <Layout>
        <BreadcrumbOne
          title="Contact Us"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Contact Us"
        />
        <div className="letmeet-contact-us edu-contact-us-area edu-section-gap bg-color-white">
          <div className="container letmeet-animated-shape">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="Need Help?"
                  title="Get In Touch With us"
                />
              </div>
            </div>
            <div className="row g-5 mt--20">
              <div className="col-lg-6">
                <div className="contact-info pr--70 pr_lg--0 pr_md--0 pr_sm--0">
                  <div className="row g-5">
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-6 col-md-6 col-sm-6 col-12"
                    >
                      <div className="contact-address-card-1 website">
                        <div className="inner">
                          <div className="icon">
                            <i className="ri-global-line" />
                          </div>
                          <div className="content">
                            <h6 className="title">Our Website</h6>
                            <p>
                              <a href="https://themeforest.net/user/devsvibe/letmeet">
                                www.letmeet.com
                              </a>
                            </p>
                            <p>
                              <a href="https://themeforest.net/user/devsvibe">
                                www.wpvive.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-6 col-md-6 col-sm-6 col-12"
                    >
                      <div className="contact-address-card-1 phone">
                        <div className="inner">
                          <div className="icon">
                            <i className="icon-Headphone" />
                          </div>
                          <div className="content">
                            <h6 className="title">Call Us On</h6>
                            <p>
                              <a href="tel: +2763 (388) 2930">
                                +2763 (388) 2930
                              </a>
                            </p>
                            <p>
                              <a href="tel: +4875 (356) 2568">
                                +4875 (356) 2568
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-6 col-md-6 col-sm-6 col-12"
                    >
                      <div className="contact-address-card-1 email">
                        <div className="inner">
                          <div className="icon">
                            <i className="icon-mail-open-line" />
                          </div>
                          <div className="content">
                            <h6 className="title">Email Us</h6>
                            <p>
                              <a href="mailto:letmeet@mail.com">
                                letmeet@mail.com
                              </a>
                            </p>
                            <p>
                              <a href="mailto:wpvive@mail.com">
                                wpvive@mail.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-6 col-md-6 col-sm-6 col-12"
                    >
                      <div className="contact-address-card-1 location">
                        <div className="inner">
                          <div className="icon">
                            <i className="icon-map-pin-line" />
                          </div>
                          <div className="content">
                            <h6 className="title">Our Location</h6>
                            <p>486 Normana Avenue Morningtide, 4223</p>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce
                className="col-lg-6"
              >
                <ContactUsForm formStyle="rnt-contact-form rwt-dynamic-form row" />
              </ScrollAnimation>
            </div>

            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-04-01.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src="/images/shapes/shape-02-08.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-3">
                <img src="/images/shapes/shape-15.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>

        <div className="edu-contact-map-area edu-section-gapBottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="google-map alignwide">
                  <GoogleMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default ContactUs
