import { compareAsc } from 'date-fns'

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase()) ? true : 'error.invalidEmail'
}

export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'error.minPassword'
  }
  if (password.length > 16) {
    return 'error.maxPassWord'
  }
  if (!password.match(/[a-z]+/)) {
    return 'error.lowercaseMiss'
  }
  if (!password.match(/[A-Z]+/)) {
    return 'error.uppercaseMiss'
  }
  if (!password.match(/[0-9]+/)) {
    return 'error.numberMiss'
  }
  if (!password.match(/[$@#&!]+/)) {
    return 'error.specialKeyMiss'
  }
  return true
}

export const validateName = (name, type) => {
  const regex = /^[a-zA-Z ]+$/
  return regex.test(name) ? true : `error.invalid${type}Name`
}

export const validateDateInFuture = (date) => {
  switch (compareAsc(date, new Date())) {
    case 1:
      return true

    case 0:
    case -1:
    default:
      return 'error.dateInFuture'
  }
}

export const validateEndAfterStartDate = (startDate, endDate) => {
  switch (compareAsc(startDate, endDate)) {
    case 1:
      return 'error.dateAfterStart'

    case 0:
    case -1:
    default:
      return true
  }
}
