import { Box } from '@mui/material'
import { SettingsNotifications } from './SettingsNotifications'
import { SettingsPassword } from './SettingsPassword'

const SettingsTab = ({ disablePasswordChange }) => (
  <>
    <SettingsNotifications />
    {!disablePasswordChange && (
      <Box sx={{ pt: 5 }}>
        <SettingsPassword />
      </Box>
    )}
  </>
)

export default SettingsTab
