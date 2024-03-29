import React, { useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import Breadcrumb from '../../common/breadcrumb/Breadcrumb'
import SectionTitle from '../../components/section-title/SectionTitle'
import {numberWithCommas} from '../../utils/helpers/number-helper'

const plans = {
  monthly: [
    {
      id: 1,
      name: 'BASIC PLAN',
      price: '$29.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        '24/7 Dedicated Support',
        'Interactive practice sessions'
      ]
    },
    {
      id: 2,
      name: 'STANDARD PLAN',
      price: '$39.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      active: true,
      badgeText: 'POPULAR',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        '24/7 Dedicated Support',
        'Lifetime Access All Courses',
        'Excercise Files & Notes'
      ]
    },
    {
      id: 3,
      name: 'PREMIUM PLAN',
      price: '$49.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        'Downloadable Video Content',
        'Lifetime Access All Courses'
      ]
    }
  ],
  yearly: [
    {
      id: 1,
      name: 'BASIC PLAN',
      price: '$15.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        '24/7 Dedicated Support',
        'Interactive practice sessions'
      ]
    },
    {
      id: 2,
      name: 'STANDARD PLAN',
      price: '$25.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      active: true,
      badgeText: 'POPULAR',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        '24/7 Dedicated Support',
        'Lifetime Access All Courses',
        'Excercise Files & Notes'
      ]
    },
    {
      id: 3,
      name: 'PREMIUM PLAN',
      price: '$35.99',
      priceType: 'Monthly',
      buttonText: 'Buy This Plan',
      purchaseLink: '#',
      features: [
        'Unlimited Access Courses',
        'Certificate After Completion',
        'High Resolution Videos',
        'Downloadable Video Content',
        'Lifetime Access All Courses'
      ]
    }
  ]
}

function Pricing() {
  const { monthly, yearly } = plans
  const [state, setState] = useState({
    active: 'yearly',
    pricingPlan: yearly
  })
  const handlePricing = (plan) => {
    if (plan === 'yearly') {
      setState({
        ...state,
        active: 'yearly',
        pricingPlan: yearly
      })
    } else {
      setState({
        ...state,
        active: 'monthly',
        pricingPlan: monthly
      })
    }
  }

  return (
    <>
      <SEO title="Pricing Plan" />
      <Layout>
        <Breadcrumb
          title="Pricing Plan"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Pricing Plan"
        />
        <div className="edu-pricing-area edu-section-gap bg-image">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <SectionTitle
                  classes="text-start"
                  slogan="Pricing Plan"
                  title="Choose Your Pricing Plan"
                />
              </div>
              <div className="col-lg-6">
                <div className="pricing-billing-duration">
                  <ul>
                    <li className="nav-item">
                      <button
                        className={
                          state.active === 'yearly'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Yearly"
                        onClick={() => handlePricing('yearly')}
                      >
                        Yearly
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={
                          state.active === 'monthly'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Monthly"
                        onClick={() => handlePricing('monthly')}
                      >
                        Monthly
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row g-5 mt--20">
              {state.active === 'monthly' &&
                state.pricingPlan.map((data, index) => (
                  <ScrollAnimation
                    animateIn="fadeIn"
                    animateOut="fadeInOut"
                    className="col-lg-4 col-md-6 col-12"
                    animateOnce
                    key={index}
                  >
                    <div
                      className={`pricing-table ${
                        data.active === true ? ' active' : ''
                      }`}
                    >
                      <div className="pricing-header">
                        {data.active === true && (
                          <div className="edu-badge">
                            <span>{data.badgeText}</span>
                          </div>
                        )}
                        <h3 className="title">{data.name}</h3>
                        <div className="price-wrap">
                          <div className="yearly-pricing">
                            <span className="amount">{numberWithCommas(data.price)}</span>
                            <span className="duration">/{data.priceType}</span>
                          </div>
                        </div>
                      </div>
                      {data.features && data.features.length > 0 && (
                        <div className="pricing-body">
                          <ul className="list-item">
                            {data.features.map((feature, i) => (
                              <li key={i}>
                                <i className="icon-checkbox-circle-line" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="pricing-btn">
                        <a
                          className={`edu-btn ${
                            data.active !== true ? ' btn-dark' : ''
                          }`}
                          href={data.purchaseLink}
                        >
                          {data.buttonText}
                          <i className="icon-arrow-right-line-right" />
                        </a>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              {state.active === 'yearly' &&
                state.pricingPlan.map((data, index) => (
                  <ScrollAnimation
                    animateIn="fadeIn"
                    animateOut="fadeInOut"
                    className="col-lg-4 col-md-6 col-12"
                    animateOnce
                    key={index}
                  >
                    <div
                      className={`pricing-table ${
                        data.active === true ? ' active' : ''
                      }`}
                    >
                      <div className="pricing-header">
                        {data.active === true && (
                          <div className="edu-badge">
                            <span>{data.badgeText}</span>
                          </div>
                        )}
                        <h3 className="title">{data.name}</h3>
                        <div className="price-wrap">
                          <div className="yearly-pricing">
                            <span className="amount">{numberWithCommas(data.price)}</span>
                            <span className="duration">/{data.priceType}</span>
                          </div>
                        </div>
                      </div>
                      {data.features && data.features.length > 0 && (
                        <div className="pricing-body">
                          <ul className="list-item">
                            {data.features.map((feature, i) => (
                              <li key={i}>
                                <i className="icon-checkbox-circle-line" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="pricing-btn">
                        <a
                          className={`edu-btn ${
                            data.active !== true ? ' btn-dark' : ''
                          }`}
                          href={data.purchaseLink}
                        >
                          {data.buttonText}
                          <i className="icon-arrow-right-line-right" />
                        </a>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Pricing
