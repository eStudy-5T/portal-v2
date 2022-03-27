// i18n
import { useTranslation } from 'react-i18next'

export const getValidationHelperText = (fieldName, errorField) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()

  switch (errorField?.type) {
    case 'required':
      return t('validationHelperText.required')

    case 'minLength':
    case 'min':
      return t(`validationHelperText.min${fieldName}`)

    case 'maxLength':
    case 'max':
      return t(`validationHelperText.max${fieldName}`)

    case 'dateInFuture':
      return t(`validationHelperText.dateInFuture`)

    case 'dateAfterStart':
      return t(`validationHelperText.dateAfterStart`)

    default:
      return ''
  }
}
