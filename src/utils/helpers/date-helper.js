import { RRule } from 'rrule'

export const createRRule = (schedule, startDate, endDate) => {
  return new RRule({
    freq: RRule.WEEKLY,
    byweekday: schedule.map(
      (s) => RRule[s.weekDay.toUpperCase().substring(0, 2)]
    ),
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
}
