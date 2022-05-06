import React from 'react'
import SEO from '../../common/SEO'
import { Link } from 'react-router-dom'

function NewCourse() {
  return (
    <>
      <SEO title="New Cousre" />
      <div className="login-register-page-wrapper edu-section-gap bg-color-white bg-login">
        <div className="tw-hidden md:tw-block tw-card">
          <div className="tw-card-body">
            <div className="tw-table tw-w-full tw-relative tw-border-none">
              <div className="tw-flex tw-items-start before:tw-top-[49px] before:tw-bottom-0 before:tw-absolute before:tw-w-full before:tw-h-[2px] before:tw-bg-primary">
                <div className="tw-text-center tw-relative tw-w-1/3">
                  <Link
                    to="/"
                    className="tw-btn tw-w-[100px] tw-h-[100px] tw-rounded-[50px] tw-pointer-events-none tw-border-[2px] tw-border-solid tw-border-primary tw-inline-block"
                  >
                    <div className="tw-h-full tw-flex tw-items-center tw-justify-center tw-text-shark tw-text-[1.9rem] tw-font-arial">
                      <Link to="/">1</Link>
                    </div>
                  </Link>
                  <p className="tw-absolute tw-w-full translate-x-[-50%] tw-my-1">
                    Test
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewCourse
