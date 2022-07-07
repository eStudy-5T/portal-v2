import { RRule } from 'rrule'
import _ from 'lodash'
import * as moment from 'moment'
import * as fns from 'date-fns'
import { COURSE_SCHEDULE_TYPE } from '../../utils/constants/misc'

const FORMAT_TIME = 'h:mma'

export const calculateTotalWeek = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return fns.differenceInWeeks(end, start)
}

export const calculatePermanentLessonNumber = (
  startDate,
  endDate,
  daysOfWeek
) => {
  const rrule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: daysOfWeek.map((d) => RRule[d.toUpperCase().substring(0, 2)]),
    dtstart: new Date(
      Date.UTC(
        new Date(startDate).getUTCFullYear(),
        new Date(startDate).getUTCMonth(),
        new Date(startDate).getUTCDate()
      )
    ),
    until: new Date(
      Date.UTC(
        new Date(endDate).getUTCFullYear(),
        new Date(endDate).getUTCMonth(),
        new Date(endDate).getUTCDate()
      )
    )
  })

  return rrule.all().length
}

export const calculateFlexibleCourse = (startDate, endDate, schedules) => {
  const schedulesGroupedByDay = _.groupBy(schedules, 'dayOfWeek')
  const result = []

  Object.keys(schedulesGroupedByDay).forEach((dayOfWeek) => {
    const rrule = new RRule({
      freq: RRule.WEEKLY,
      byweekday: [RRule[dayOfWeek.toUpperCase().substring(0, 2)]],
      byhour: Array.from(
        Array(schedulesGroupedByDay[dayOfWeek].length),
        () => 0
      ),
      dtstart: new Date(
        Date.UTC(
          new Date(startDate).getUTCFullYear(),
          new Date(startDate).getUTCMonth(),
          new Date(startDate).getUTCDate()
        )
      ),
      until: new Date(
        Date.UTC(
          new Date(endDate).getUTCFullYear(),
          new Date(endDate).getUTCMonth(),
          new Date(endDate).getUTCDate()
        )
      )
    })

    schedulesGroupedByDay[dayOfWeek].forEach((s, idx, arr) => {
      result.push({
        lessonNumber:
          arr.length > 1 ? rrule.all().length / 2 : rrule.all().length,
        startTime: s.startTime,
        endTime: s.endTime
      })
    })
  })

  return result
}

export const calculateTotalLessonInCourse = (
  startDate,
  endDate,
  daysOfWeek = [],
  schedules = [],
  scheduleType
) => {
  if (scheduleType === COURSE_SCHEDULE_TYPE.PERMANENT) {
    return calculatePermanentLessonNumber(
      new Date(startDate),
      new Date(endDate),
      daysOfWeek
    )
  } else if (scheduleType === COURSE_SCHEDULE_TYPE.FLEXIBLE) {
    const result = calculateFlexibleCourse(
      new Date(startDate),
      new Date(endDate),
      schedules
    )
    return result.reduce((totalLessonNumber, cur) => {
      return totalLessonNumber + cur.lessonNumber
    }, 0)
  }
}

export const calculateCourseTotalDuration = (
  startDate,
  endDate,
  daysOfWeek,
  schedules,
  scheduleType,
  lessonNumberPerWeek,
  startTime,
  endTime
) => {
  if (scheduleType === COURSE_SCHEDULE_TYPE.PERMANENT) {
    return (
      calculatePermanentLessonNumber(startDate, endDate, daysOfWeek) *
      Math.floor(calculateDuration(startTime, endTime) / 60)
    )
  } else if (scheduleType === COURSE_SCHEDULE_TYPE.FLEXIBLE) {
    const result = calculateFlexibleCourse(
      new Date(startDate),
      new Date(endDate),
      schedules
    )
    return result.reduce((totalDuration, cur) => {
      return (
        totalDuration +
        cur.lessonNumber *
          Math.floor(calculateDuration(cur.startTime, cur.endTime) / 60)
      )
    }, 0)
  }
  return 0
}

export const calculateDuration = (startTime, endTime) => {
  const m_start = moment(startTime, FORMAT_TIME)
  const m_end = moment(endTime, FORMAT_TIME)
  const duration = moment.duration(m_end.diff(m_start)).asMinutes()
  return duration
}
