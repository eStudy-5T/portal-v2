export const validateBasicForm = (formData) => {
  let isValid = false
  delete formData['onlineProfile']

  for (let field in formData) {
    if (formData[field]) {
      isValid = true
    } else {
      isValid = false
      break
    }
  }

  return isValid
}

export const validateAdvancedForm = (formData) => {
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
