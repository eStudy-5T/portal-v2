import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import SectionTitle from '../../components/section-title/SectionTitle'
import ContactMeForm from '../../components/contact/ContactMeForm'

function ContactUs() {
  return (
    <>
      <SEO title="Contact Me" />
      <Layout>
        <div className="letmeet-contact-me-top edu-contact-me-area about-me-1 edu-section-gap bg-color-white">
          <div className="container letmeet-animated-shape">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="pr--75 pr_lg--0 pr_md--0 pr_sm--0">
                  <div className="thumbnail">
                    <img
                      className="w-100"
                      src="/images/contact/contact-me/contact-1.jpg"
                      alt="Contact Me"
                    />
                    <div className="content-overlay">
                      <h4 className="title">
                        Don’t Be Hesitate To <br /> Contact With US
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <ScrollAnimation
                animateIn="fadeIn"
                animateOut="fadeInOut"
                animateOnce
                className="col-lg-6"
              >
                <SectionTitle
                  classes="text-start mb--60"
                  slogan="Contact Us"
                  title="Send Us A Message"
                />
                <ContactMeForm formStyle="rnt-contact-form rwt-dynamic-form row" />
              </ScrollAnimation>
            </div>

            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-03-11.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src="/images/shapes/shape-15-06.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-3">
                <img src="/images/shapes/shape-09-03.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-4">
                <img src="/images/shapes/shape-03-02.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>

        <div className="letmeet-contact-me-bottom edu-contact-address contact-address-bottom-shape edu-section-gapBottom">
          <div className="container letmeet-animated-shape">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="LOCATIONS"
                  title="Our Offices Locations"
                />
              </div>
            </div>

            <div className="row g-5 mt--20">
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce
                className="col-lg-4 col-md-6"
              >
                <div className="contact-address-card-2">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/contact/contact-me/whatsapp.png"
                        alt="Icon Images"
                      />
                    </div>
                    <div className="content">
                      <h6 className="title">Contact</h6>
                      <p>
                        <span className="subtitle">Mobile: </span>
                        <a href="tel: (+88) - 1990 - 6886">
                          {' '}
                          (+88) - 1990 - 6886
                        </a>
                      </p>
                      <p>
                        <span className="subtitle">Hotline: </span>
                        <a href="tel: 1800 - 1102">1800 - 1102</a>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce
                className="col-lg-4 col-md-6"
              >
                <div className="contact-address-card-2">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/contact/contact-me/house.png"
                        alt="Icon Images"
                      />
                    </div>
                    <div className="content">
                      <h6 className="title">Address</h6>
                      <p>
                        227 Nguyễn Văn Cừ <br /> Q5 - HCM
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce
                className="col-lg-4 col-md-6"
              >
                <div className="contact-address-card-2">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/contact/contact-me/linkedin.png"
                        alt="Icon Images"
                      />
                    </div>
                    <div className="content">
                      <h6 className="title">Working Hours</h6>
                      <p>
                        <span className="subtitle">Monday - Friday: </span>
                        <span className="text">09:00 - 20:00</span>
                      </p>
                      <p>
                        <span className="subtitle">Sunday & Saturday: </span>
                        <span className="text">10:30 - 22:00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-03-01.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src="/images/shapes/shape-05-06.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-3">
                <img src="/images/shapes/shape-14-03.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-4">
                <img src="/images/shapes/shape-05-03.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-5">
                <img src="/images/shapes/shape-01-03.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
          <div className="bg-shape-image">
            <img
              src="/images/contact/contact-me/bg-image-27.jpg"
              alt="Shape Images"
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
export default ContactUs
