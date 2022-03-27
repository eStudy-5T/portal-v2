import React from 'react'
import Slider from 'react-slick'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import PostOne from '../../components/post/PostOne'
import PostData from '../../data/blog/PostData.json'
import { BlogCarouselParams } from '../../utils/configs/ui-config'

function BlogCarousel() {
  return (
    <>
      <SEO title="Blog Carousel" />
      <Layout>
        <BreadcrumbOne
          title="Blog Carousel"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Blog Carousel"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="Latest From News"
                  title="Get Our Every News & Blog"
                />

                <Slider
                  className="letmeet-post-one-carousel-wrapper mt--40 edu-slick-button"
                  {...BlogCarouselParams}
                >
                  {PostData.slice(0, 6).map((item) => (
                    <div
                      className="letmeet-post-one-carousel-item"
                      key={item.id}
                    >
                      <PostOne data={item} />
                    </div>
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

export default BlogCarousel
