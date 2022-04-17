import React, { useEffect, useState } from 'react'
import { FiChevronUp } from 'react-icons/fi'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  const [isMounted, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      isMounted && setVisible(true)
    } else if (scrolled <= 300) {
      isMounted && setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <div
      className="rn-back-top"
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <FiChevronUp />
    </div>
  )
}

export default ScrollTopButton
