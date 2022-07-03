import React from 'react'
import { Alert, Box } from '@mui/material'
import HeaderSticky from '../header/HeaderSticky'

const AlertWrapper = (props) => {
  const { severity = 'warning', children } = props

  const sticky = HeaderSticky(200)
  const classes = sticky ? 'sticky' : 'global-alert--none'

  return (
    <Box className={`global-alert edu-header header-sticky animated ${classes}`}>
      <Alert className="global-alert__container" severity={severity}>
        {children}
      </Alert>
    </Box>
  )
}

export default AlertWrapper
