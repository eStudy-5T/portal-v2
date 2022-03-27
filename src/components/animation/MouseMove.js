import React, { useEffect } from 'react'
import Parallax from 'parallax-js'
import PropTypes from 'prop-types'

function MouseMove({
  imageURL,
  classes,
  dataDepth,
  type,
  imageName,
  colorClass
}) {
  useEffect(() => {
    const scene = document.querySelectorAll('.scene')
    if (scene) {
      scene.forEach((el) => {
        new Parallax(el)
      })
    }
  }, [])

  return (
    <div className={`scene ${classes}`}>
      {type !== 'color' ? (
        <img
          data-depth={dataDepth}
          src={`${process.env.PUBLIC_URL}/images/shapes/${imageURL}`}
          alt={imageName || 'mouse-moving-particle'}
        />
      ) : (
        <span
          data-depth={dataDepth}
          className={`${colorClass || 'shape-dot'}`}
        />
      )}
    </div>
  )
}

MouseMove.propTypes = {
  imageURL: PropTypes.string,
  classes: PropTypes.string,
  dataDepth: PropTypes.string,
  type: PropTypes.string,
  imageName: PropTypes.string,
  colorClass: PropTypes.string
}

export default MouseMove
