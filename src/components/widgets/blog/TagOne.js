import React from 'react'
import { Link } from 'react-router-dom'
import { flatDeep, slugify, containsObject } from '../../../utils'
import PostData from '../../../data/blog/PostData.json'

function TagOne(props) {
  const tagItems = PostData.map((item) => item.tags)

  const singleCatArray = flatDeep(tagItems)
  const tags = []
  singleCatArray.forEach((cat) => {
    const obj = {
      title: cat.trim(),
      slug: slugify(cat),
      count: 1
    }
    const objIndex = containsObject(obj, tags)
    if (objIndex !== -1) {
      const prevCount = tags[objIndex].count
      tags[objIndex] = {
        title: cat.trim(),
        slug: slugify(cat),
        count: prevCount + 1
      }
    } else {
      tags.push(obj)
    }
  })

  return (
    <div
      className={`edu-blog-widget${
        props.style2 === 'enable' ? '-2' : ''
      } widget-tags ${props.extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Popular Tags</h5>
        <div className="content">
          <div
            className={`tag-list${
              props.style2 === 'enable' ? ' bg-shade' : ''
            }`}
          >
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={`${process.env.PUBLIC_URL}/tag/${tag.slug}`}
              >
                {tag.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagOne
