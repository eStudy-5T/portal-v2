import { compareAsc } from 'date-fns'

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export const validatePassword = (password) => {
  let error
  if (password.length < 6) {
    return (error = 'error.minPassword')
  }
  if (password.length > 16) {
    return (error = 'error.maxPassWord')
  }
  if (!password.match(/[a-z]+/)) {
    return (error = 'error.lowercaseMiss')
  }
  if (!password.match(/[A-Z]+/)) {
    return (error = 'error.uppercaseMiss')
  }
  if (!password.match(/[0-9]+/)) {
    return (error = 'error.numberMiss')
  }
  if (!password.match(/[$@#&!]+/)) {
    return (error = 'error.specialKeyMiss')
  }
  return error
}

export const validateName = (name) => {
  const regex = /^[a-zA-Z]+$/
  return regex.test(name)
}

export const validateDateInFuture = (date) => {
  switch (compareAsc(date, new Date())) {
    case 1:
      return true

    case 0:
    case -1:
    default:
      return false
  }
}

export const validateEndAfterStartDate = (startDate, endDate) => {
  switch (compareAsc(startDate, endDate)) {
    case 1:
      return false

    case 0:
    case -1:
    default:
      return true
  }
}
