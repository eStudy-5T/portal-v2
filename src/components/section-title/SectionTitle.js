import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

function SectionTitle({ slogan, title, classes }) {
  return (
    <div className={`section-title ${classes || ''}`}>
      <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" animateOnce>
        <span
          className="pre-title"
          dangerouslySetInnerHTML={{ __html: slogan }}
        />
      </ScrollAnimation>

      <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" animateOnce>
        <h3 className="title" dangerouslySetInnerHTML={{ __html: title }} />
      </ScrollAnimation>
    </div>
  )
}
export default SectionTitle
