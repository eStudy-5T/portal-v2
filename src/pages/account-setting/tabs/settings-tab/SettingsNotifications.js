import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  FormControlLabel,
  Typography
} from '@mui/material'

import { useTranslation } from 'react-i18next'

const styles = {
  checkBox: {
    '&.Mui-checked': {
      color: 'var(--color-primary)'
    }
  }
}

export const SettingsNotifications = (props) => {
  const { t: translation } = useTranslation()
  return (
    <form {...props}>
      <Card
        sx={{
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius)'
        }}
      >
        <CardHeader
          subheader={translation('accountSetting.manageTheNotifications')}
          title={translation('accountSetting.notifications')}
          sx={{
            '& .MuiCardHeader-title': {
              color: 'var(--color-primary)'
            },
            '& .MuiCardHeader-subheader': {
              color: 'var(--color-secondary)'
            }
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography color="textPrimary" gutterBottom variant="h6">
                Notifications
              </Typography>
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} defaultChecked />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} />}
                label="Text Messages"
              />
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} defaultChecked />}
                label="Phone calls"
              />
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography color="textPrimary" gutterBottom variant="h6">
                Messages
              </Typography>
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox sx={styles.checkBox} defaultChecked />}
                label="Phone calls"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            className="edu-btn btn-small"
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
          >
            {translation('accountSetting.save')}
          </Button>
        </Box>
      </Card>
    </form>
  )
}
