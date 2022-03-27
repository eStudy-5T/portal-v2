import React from 'react'

function PaginationOne() {
  return (
    <nav>
      <ul className="edu-pagination">
        <li>
          <a href="#">
            <i className="ri-arrow-drop-left-line" />
          </a>
        </li>
        <li>
          <a href="#">1</a>
        </li>
        <li className="active">
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li>
        <li>
          <a href="#">...</a>
        </li>
        <li>
          <a href="#">8</a>
        </li>
        <li>
          <a href="#">
            <i className="ri-arrow-drop-right-line" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationOne
