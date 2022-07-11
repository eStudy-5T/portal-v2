import { Box } from '@mui/material'
import { SettingsNotifications } from './SettingsNotifications'
import { SettingsPassword } from './SettingsPassword'

const SettingsTab = ({ disablePasswordChange }) => (
  <>
    {/* <Box sx={{ pb: 5 }}>
      <SettingsNotifications />
    </Box> */}
    {!disablePasswordChange && <SettingsPassword />}
  </>
)

export default SettingsTab
