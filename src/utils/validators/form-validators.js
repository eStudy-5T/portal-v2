import {
  validateEmail,
  validatePassword,
  validateName
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
  if (!formData.firstName || !formData.lastName) {
    return { error: 'error.emptyField' }
  }

  if (!validateName(formData.firstName)) {
    return { error: 'error.invalidFirstName' }
  }

  if (!validateName(formData.lastName)) {
    return { error: 'error.invalidLastName' }
  }

  return { error: null }
}
