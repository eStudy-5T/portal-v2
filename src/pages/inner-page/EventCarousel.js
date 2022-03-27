import React from 'react'
import Slider from 'react-slick'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import EventTwo from '../../components/event/EventTwo'
import EventData from '../../data/event/EventData.json'
import { TheeColumnCarousel } from '../../utils/configs/ui-config'

function EventCarousel() {
  return (
    <>
      <SEO title="Event Carousel" />
      <Layout>
        <BreadcrumbOne
          title="Event Carousel"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Event Carousel"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="UPCOMMING EVENT"
                  title="Let’s Join Our Community"
                />

                <Slider
                  className="letmeet-event-one-carousel-wrapper mt--40 edu-slick-button"
                  {...TheeColumnCarousel}
                >
                  {EventData.slice(0, 6).map((item) => (
                    <EventTwo
                      key={item.id}
                      data={item}
                      classes="letmeet-event-one-carousel-item"
                      shade="enable"
                      animationName="letmeetFadeInUp"
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EventCarousel
