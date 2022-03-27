import PropTypes from 'prop-types'
import React from 'react'

function SEO({ title }) {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{title ? title : 'LetMeet - Online Learning and Education'}</title>
      <meta name="robots" content="noindex, follow" />
      <meta
        name="description"
        content="LetMeet – Online Learning and Education"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </>
  )
}

SEO.propTypes = {
  title: PropTypes.string
}

export default SEO
