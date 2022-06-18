import {
  validateEmail,
  validatePassword,
  validateName,
  validateDateOfBirth,
  validatePhoneNumber
} from './field-validators'

export const signInFormValidator = (formData) => {
  if (!formData.email || !formData.password) {
    return { error: 'error.emptyField' }
  }

  if (!validateEmail(formData.email)) {
    return { error: 'error.invalidEmail' }
  }

  return { error: null }
}

export const signUpFormValidator = (formData) => {
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    return { error: 'error.emptyField' }
  }

  if (!validateEmail(formData.email)) {
    return { error: 'error.invalidEmail' }
  }

  const passwordError = validatePassword(formData.password)
  if (passwordError) {
    return { error: passwordError }
  }

  if (formData.password !== formData.confirmPassword) {
    return { error: 'error.invalidConfirmPassword' }
  }

  if (!formData.acceptPolicy) {
    return { error: 'error.invalidPolicy' }
  }

  return { error: null }
}

export const updateUserInfoFormValidator = (formData) => {
  if (!formData.firstName || !formData.lastName || !formData.mobilePhone || !formData.nationality) {
    return { error: 'error.emptyField' }
  }

  if (!validateName(formData.firstName)) {
    return { error: 'error.invalidFirstName' }
  }

  if (!validateName(formData.lastName)) {
    return { error: 'error.invalidLastName' }
  }

  const birthdayError = validateDateOfBirth(formData.dateOfBirth)
  if (birthdayError !== true) {
    return {error: birthdayError}
  }

  if (!validatePhoneNumber(formData.mobilePhone)) {
    return { error: 'error.invalidMobilePhone' }
  }

  return { error: null }
}
