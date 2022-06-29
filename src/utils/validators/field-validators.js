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

export const validateName = (name) => {
  const removeAscent = (str) => {
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    return str
  }
  const regex = /^[a-zA-Z ]{2,}$/g
  return regex.test(removeAscent(name))
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

export const validateDateOfBirth = (date) => {
  const currentDate = new Date()
  const d = new Date(date)
  if (d >= Date.now()) return 'error.invalidBirthday'
  else if (currentDate.getFullYear() - d.getFullYear() < 4)
    return 'error.notOldEnough'
  else return true
}

export const validatePhoneNumber = (mobilePhone) => {
  const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  return regex.test(mobilePhone)
}
