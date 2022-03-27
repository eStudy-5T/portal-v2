import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import PropTypes from 'prop-types'

function Comment({ url, id, title }) {
  const disqusShortname = 'devsvibe-com'
  const disqusConfig = {
    url,
    identifier: `${id}`,
    title
  }
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
}

Comment.propTypes = {
  url: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string
}

export default Comment
