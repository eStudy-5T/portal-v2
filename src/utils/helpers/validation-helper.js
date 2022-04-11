export const getValidationHelperText = (errorField, fieldName = '') => {
  switch (errorField?.type) {
    case 'minLength':
    case 'min':
      return `error.min${fieldName}`

    case 'maxLength':
    case 'max':
      return `error.max${fieldName}`

    default:
      return errorField?.message || ''
  }
}
