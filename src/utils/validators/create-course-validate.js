import { COURSE_SCHEDULE_TYPE } from '../constants/misc'

export const validateBasicForm = (formData) => {
  let isValid = false

  for (let field in formData) {
    if (
      (!Array.isArray(formData[field]) && formData[field]) ||
      (Array.isArray(formData[field]) && !!formData[field].length)
    ) {
      isValid = true
    } else {
      isValid = false
      break
    }
  }

  return isValid
}

export const validateScheduleForm = (formData) => {
  let isValid = false

  const permanentNeedField = ['startTime', 'endTime', 'daysOfWeek']
  const flexibleNeedField = ['lessonNumberPerWeek', 'schedules']

  if (formData.scheduleType === COURSE_SCHEDULE_TYPE.PERMANENT) {
    flexibleNeedField.forEach((field) => delete formData[field])

    for (let field in formData) {
      if (
        (!Array.isArray(formData[field]) && formData[field]) ||
        (Array.isArray(formData[field]) && !!formData[field].length)
      ) {
        isValid = true
      } else {
        isValid = false
      }
    }
  } else if (formData.scheduleType === COURSE_SCHEDULE_TYPE.FLEXIBLE) {
    permanentNeedField.forEach((field) => delete formData[field])

    for (let field in formData) {
      if (
        (!Array.isArray(formData[field]) && formData[field]) ||
        (Array.isArray(formData[field]) && !!formData[field].length)
      ) {
        isValid = true
      } else {
        isValid = false
      }
    }

    if (
      formData.schedules &&
      formData.schedules.length !== Number(formData.lessonNumberPerWeek)
    ) {
      isValid = false
    }
  }

  return isValid
}
