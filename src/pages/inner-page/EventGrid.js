import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PaginationOne from '../../components/pagination/PaginationOne'
import EventTwo from '../../components/event/EventTwo'
import EventData from '../../data/event/EventData.json'

function EventGrid() {
  const EventItems = EventData.slice(0, 9)
  return (
    <>
      <SEO title="Event Grid" />
      <Layout>
        <BreadcrumbOne
          title="Event Grid"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Event Grid"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              {EventItems.map((item) => (
                <EventTwo key={item.id} data={item} />
              ))}
            </div>
            <div className="row">
              <div className="col-lg-12 mt--60">
                <PaginationOne />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EventGrid
