import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PaginationOne from '../../components/pagination/PaginationOne'
import EventOne from '../../components/event/EventOne'
import EventData from '../../data/event/EventData.json'

function EventList() {
  const EventItems = EventData.slice(0, 6)
  return (
    <>
      <SEO title="Event List" />
      <Layout>
        <BreadcrumbOne
          title="Event List"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Event List"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              {EventItems.map((item) => (
                <EventOne key={item.id} data={item} />
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

export default EventList
