import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

function ResponsiveMenu({ show, onClose, showSearch, onSearch }) {
  const elements = document.querySelectorAll(
    '.popup-mobile-menu .has-droupdown > a'
  )
  const elementsTwo = document.querySelectorAll(
    '.popup-mobile-menu .with-megamenu > a'
  )
  for (var i in elements) {
    if (elements.hasOwnProperty(i)) {
      elements[i].onclick = function () {
        // this.parentElement.querySelector('.submenu').classList.toggle('active')
        // this.classList.toggle('open')
      }
    }
  }

  for (const j in elementsTwo) {
    if (elementsTwo.hasOwnProperty(i)) {
      elementsTwo[j].onclick = function () {
        this.parentElement
          .querySelector('.rn-megamenu')
          .classList.toggle('active')
        this.classList.toggle('open')
      }
    }
  }

  return (
    <>
      <div className={show ? 'backdrop' : ''} onClick={onClose}></div>
      <div className={`popup-mobile-menu ${show ? 'active' : ''}`}>
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <img src="/images/logo/logo.png" alt="Main Logo" />
              </Link>
            </div>
            <div className="close-menu">
              <button className="close-button" onClick={onClose}>
                <i className="ri-close-line" />
              </button>
            </div>
          </div>
          <Nav />
        </div>
      </div>

      <div className={`edu-search-popup ${showSearch ? 'open' : ''}`}>
        <div className="close-button">
          <button className="close-trigger" onClick={onSearch}>
            <i className="ri-close-line" />
          </button>
        </div>
        <div className="inner">
          <form className="search-form" action="#">
            <input
              type="text"
              className="letmeet-search-popup-field"
              placeholder="Search Here..."
            />
            <button className="submit-button">
              <i className="icon-search-line" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResponsiveMenu
