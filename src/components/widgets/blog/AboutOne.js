/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function AboutOne(props) {
  return (
    <div
      className={`edu-blog-widget ${
        props.style2 === 'enable' ? 'edu-about-widget-2' : ''
      } widget-about ${props.extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">About Me</h5>
        <div className="content">
          <div className="about-wrapper">
            <div className="thumbnail">
              <img src="/images/widget/about/about-me.png" alt="Blog Images" />
            </div>
            <div className="about-content">
              <h6 className="title">Helenex D. Leona</h6>
              <p>
                Vesti at bulum nec the odio aea the dumm ipsumm ipsum that
                dolocons rsus malware suada fadolorit to consectetur
              </p>
              <ul className="social-share icon-transparent justify-content-center">
                <li>
                  <a href="#">
                    <i className="icon-Fb" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-Pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-Twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutOne
