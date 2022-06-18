import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const CustomDialog = ({
  title,
  maxWidth,
  fullWidth,
  children,
  open,
  setOpen
}) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      open={open}
      maxWidth={maxWidth}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography
            variant="title"
            style={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#4a4a4a'
            }}
          >
            {title}
          </Typography>
          <CloseIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false)
            }}
          />
        </div>
      </DialogTitle>
      <Divider sx={{ background: '#e0e0e0' }} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
export default CustomDialog
