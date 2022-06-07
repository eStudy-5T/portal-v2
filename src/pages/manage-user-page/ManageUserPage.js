import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import userService from '../../services/user-service'
import { useTranslation } from 'react-i18next'
import StudentOne from '../../components/student/StudentOne'

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

function ManageUserPage({ wrapperClass }) {
  const [students, setStudents] = useState([])
  const { t: translation } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  const currentUserId = localStorage.getItem('currentUserId')

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

  useEffect(() => {
    setIsMounted(true)
    userService.getStudents(currentUserId).then(({ data: StudentsData }) => {
      if (isMounted) {
        setStudents(StudentsData)
      }
    })
  }, [currentUserId, isMounted])

  return (
    <>
      <SEO title="Manage Users" />
      <Layout>
        {/* <div className="edu-elements-area edu-section-gap bg-color-white">
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
                <InstructorOne key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div> */}

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
                  <h3 className="title">{translation('admin.studentList')}</h3>
                </div>
              </div>
            </div>
            {students?.length > 12 ? (
              <div className="row">
                <div className="col-lg-12">
                  <Slider
                    className={
                      wrapperClass ||
                      'team-activation-01 edu-slick-arrow-top edu-slick-button slick-gutter-15 mt--60 mb_dec--20 pb--40'
                    }
                    {...sliderSettings}
                  >
                    {students.map((item) => (
                      <StudentOne
                        key={item.id}
                        data={item}
                        classes="instructor-one-each-slide"
                      />
                    ))}
                  </Slider>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                {students.map((item) => (
                  <StudentOne
                    key={item.id}
                    data={item}
                    classes="instructor-one-each-slide"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ManageUserPage
