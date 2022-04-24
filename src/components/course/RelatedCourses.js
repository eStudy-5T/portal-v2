/* eslint-disable no-sequences */
import React from 'react'
import Slider from 'react-slick'
import CourseData from '../../data/course/CourseData.json'
import { TheeColumnCarousel2 } from '../../utils/configs/ui-config'
import CourseTypeOne from './CourseTypeOne'

// i18
import { useTranslation } from 'react-i18next'

function RelatedCourses({ courseID }) {
  const { t: translation } = useTranslation()

  const coursIndex = courseID - 1
  const catts = CourseData[coursIndex].categories

  const similarCourseIndexes = CourseData.reduce(
    (arr, e, i) => (
      e.categories.some((r) => catts.includes(r)) && arr.push(i + 1), arr
    ),
    []
  )

  const removeCurrentCourseIndex = similarCourseIndexes.indexOf(courseID)
  if (removeCurrentCourseIndex > -1) {
    similarCourseIndexes.splice(removeCurrentCourseIndex, 1)
  }

  const commonCourses = CourseData.filter((element) =>
    similarCourseIndexes.includes(element.id)
  )

  return (
    // based on common categories.
    <>
      {commonCourses && commonCourses.length > 0 && (
        <div className="edu-course-wrapper pt--65">
          <div className="section-title text-start mb--20">
            <span className="pre-title">{translation("relatedCourses.title")}</span>
            <h3 className="title">{translation("relatedCourses.coursesSuggestion")}</h3>
          </div>
          <Slider
            className="mt--40 edu-slick-button slick-activation-wrapper letmeet-course-one-carousel"
            {...TheeColumnCarousel2}
          >
            {commonCourses.map((course) => (
              <div className="single-slick-card" key={course.id}>
                <CourseTypeOne data={course} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  )
}

export default RelatedCourses
