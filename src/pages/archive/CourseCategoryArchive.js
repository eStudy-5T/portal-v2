import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { useParams } from 'react-router-dom'
import { slugify } from '../../utils'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import CourseTypeOne from '../../components/course/CourseTypeOne'
import CourseData from '../../data/course/CourseData.json'

function CourseCategoryArchive() {
  const { slug } = useParams()
  const data = CourseData.map((course) => ({
    ...course,
    categories: course.categories.filter((catItem) => slugify(catItem) === slug)
  })).filter((course) => course.categories.length > 0)

  const catTitle = data[0].categories[0]

  return (
    <>
      <SEO title={`Courses On "${catTitle}" Category`} />
      <Layout>
        <BreadcrumbOne
          title={catTitle}
          rootUrl="/"
          parentUrl="Home"
          currentUrl={`Courses On "${catTitle}" Category`}
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div className="row g-5">
                  {data.map((item) => (
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-4 col-md-6 col-12"
                      key={item.id}
                    >
                      <CourseTypeOne data={item} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseCategoryArchive
