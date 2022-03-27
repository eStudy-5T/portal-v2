import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PaginationOne from '../../components/pagination/PaginationOne'
import PostOne from '../../components/post/PostOne'
import SearchOne from '../../components/widgets/blog/SearchOne'
import CategoryOne from '../../components/widgets/blog/CategoryOne'
import LatestPostOne from '../../components/widgets/blog/LatestPostOne'
import AboutOne from '../../components/widgets/blog/AboutOne'
import TagOne from '../../components/widgets/blog/TagOne'
import InstagramOne from '../../components/widgets/blog/InstagramOne'
import PostData from '../../data/blog/PostData.json'

function BlogGridRightSidebar() {
  return (
    <>
      <SEO title="Blog Grid" />
      <Layout>
        <BreadcrumbOne
          title="Blog Grid With Right Sidebar"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Blog Grid"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="row g-5">
                  {PostData.slice(0, 12).map((item) => (
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-6 col-md-6 col-12"
                      key={item.id}
                    >
                      <PostOne data={item} />
                    </ScrollAnimation>
                  ))}
                </div>
                <div className="row">
                  <div className="col-lg-12 mt--60">
                    <PaginationOne />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="edu-blog-sidebar">
                  <SearchOne />
                  <CategoryOne extraClass="mt--40" />
                  <LatestPostOne extraClass="mt--40" />
                  <AboutOne extraClass="mt--40" />
                  <TagOne extraClass="mt--40" />
                  <InstagramOne extraClass="mt--40" />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default BlogGridRightSidebar
