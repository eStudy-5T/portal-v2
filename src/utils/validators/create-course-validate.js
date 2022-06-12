export const validateForm = (formData) => {
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
