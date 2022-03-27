import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { useParams } from 'react-router-dom'
import { slugify } from '../../utils'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import PostOne from '../../components/post/PostOne'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PostData from '../../data/blog/PostData.json'

function CategoryArchive() {
  const { slug } = useParams()
  const data = PostData.map((blog) => ({
    ...blog,
    categories: blog.categories.filter((catItem) => slugify(catItem) === slug)
  })).filter((blog) => blog.categories.length > 0)

  const catTitle = data[0].categories[0]

  return (
    <>
      <SEO title={`Posts On "${catTitle}" Category`} />
      <Layout>
        <BreadcrumbOne
          title={catTitle}
          rootUrl="/"
          parentUrl="Home"
          currentUrl={`Posts On "${catTitle}" Category`}
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
                      <PostOne data={item} />
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

export default CategoryArchive
