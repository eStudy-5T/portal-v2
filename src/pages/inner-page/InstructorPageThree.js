import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import InstructorThree from '../../components/instructor/InstructorThree'
import InstructorData from '../../data/instructor/InstructorData.json'

function InstructorPageThree() {
  const Instructors = InstructorData.slice(0, 8)
  return (
    <>
      <SEO title="Instructor 3" />
      <Layout>
        <BreadcrumbOne
          title="Instructor 3"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Instructor-3"
        />
        <div className="edu-intructor-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="SKILLED INSTRUCTOR"
                  title="Introduce Our Life Coaches"
                />
              </div>
            </div>
            <div className="row g-5 mt--20">
              {Instructors.map((item) => (
                <InstructorThree key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default InstructorPageThree
