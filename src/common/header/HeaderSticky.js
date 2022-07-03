import { useLayoutEffect, useState } from 'react'

const HeaderSticky = (offset = 0, initSticky = false) => {
  const [sticky, setSticky] = useState(initSticky)

  const handleScroll = () => {
    setSticky(window.scrollY > offset)
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return sticky
}

export default HeaderSticky
