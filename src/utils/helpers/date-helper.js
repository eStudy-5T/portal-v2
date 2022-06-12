import { RRule } from 'rrule'
import _ from 'lodash'

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
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      )
    ),
    until: new Date(
      Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate()
      )
    )
  })

  return rrule.all().length
}

export const calculateFlexibleLessonNumber = (
  startDate,
  endDate,
  schedules
) => {
  const schedulesGroupedByDay = _.groupBy(schedules, 'dayOfWeek')
  let lessonNumber = 0

  Object.keys(schedulesGroupedByDay).forEach((dayOfWeek) => {
    const rrule = new RRule({
      freq: RRule.WEEKLY,
      byweekday: [RRule[dayOfWeek.toUpperCase().substring(0, 2)]],
      byhour: Array.from(Array(schedulesGroupedByDay[dayOfWeek]).keys()),
      dtstart: new Date(
        Date.UTC(
          startDate.getUTCFullYear(),
          startDate.getUTCMonth(),
          startDate.getUTCDate()
        )
      ),
      until: new Date(
        Date.UTC(
          endDate.getUTCFullYear(),
          endDate.getUTCMonth(),
          endDate.getUTCDate()
        )
      )
    })

    lessonNumber += rrule.all().length
  })

  return lessonNumber
}
