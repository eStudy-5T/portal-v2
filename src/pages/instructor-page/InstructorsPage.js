import React from 'react'
import Slider from 'react-slick'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import Breadcrumb from '../../common/breadcrumb/Breadcrumb'
import InstructorDetail from '../../components/instructor/InstructorDetail'
import SectionTitle from '../../components/section-title/SectionTitle'
import InstructorData from '../../data/instructor/InstructorData.json'

function PrevArrow(props) {
  const { onClick } = props
  return (
    <button className="slide-arrow prev-arrow" onClick={onClick}>
      <i className="icon-arrow-left-line" />
    </button>
  )
}

function NextArrow(props) {
  const { onClick } = props
  return (
    <button className="slide-arrow next-arrow" onClick={onClick}>
      <i className="icon-arrow-right-line" />
    </button>
  )
}

function InstructorsPage({ wrapperClass }) {
  const TeamMembers = InstructorData.slice(0, 8)
  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },
      {
        breakpoint: 577,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          arrows: false
        }
      }
    ]
  }

  return (
    <>
      <SEO title="Instructor 1" />
      <Layout>
        <Breadcrumb
          title="Instructor 1"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Instructor-1"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="Skilled Instructor"
                  title="Instructors Grid"
                />
              </div>
            </div>
            <div className="row row--20">
              {TeamMembers.map((item) => (
                <InstructorDetail key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="edu-team-carousel-area edu-section-gapBottom">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div
                  className="section-title sal-animate"
                  data-sal-delay="150"
                  data-sal="slide-up"
                  data-sal-duration="800"
                >
                  <span className="pre-title">Skilled Instructor</span>
                  <h3 className="title">Instructors Slider</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Slider
                  className={
                    wrapperClass ||
                    'team-activation-01 edu-slick-arrow-top edu-slick-button slick-gutter-15 mt--60 mb_dec--20 pb--40'
                  }
                  {...sliderSettings}
                >
                  {InstructorData.slice(0, 6).map((item) => (
                    <InstructorDetail
                      key={item.id}
                      data={item}
                      classes="instructor-one-each-slide"
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

export default InstructorsPage
