import React from 'react'

// MUI components
import Typography from '@mui/material/Typography'

// i18n
import { useTranslation } from 'react-i18next'

const ToastContent = ({ content }) => {
  const { t: translation } = useTranslation()

  return <Typography fontSize="1.5rem">{translation(content)}</Typography>
}

export default ToastContent
