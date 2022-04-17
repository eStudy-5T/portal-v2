import React from 'react'
import { alpha } from '@mui/system'
import { CircularProgress, Box } from '@mui/material'

const Loading = ({ isOverlay = false }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOverlay ? alpha('#000', 0.5) : 'transparent',
        zIndex: 999999
      }}
    >
      <CircularProgress size={100} />
    </Box>
  )
}

export default Loading
