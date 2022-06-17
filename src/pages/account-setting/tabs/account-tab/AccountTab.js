// MUI
import {
  Grid
} from '@mui/material'

import Account from './Account'
import AccountDetails from './AccountDetails'

const AccountTab = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <Account info={props.info} />
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <AccountDetails info={props.info} />
      </Grid>
    </Grid>
  )
}
export default AccountTab
