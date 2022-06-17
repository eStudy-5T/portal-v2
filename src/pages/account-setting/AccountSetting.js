import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// MUI
import { Box, Container, Tab, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { useTranslation } from 'react-i18next'

import AccountTab from './tabs/account-tab/AccountTab'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import SettingsTab from './tabs/settings-tab/SettingsTab'

const AccountSetting = () => {
  const userInfo = useSelector((state) => state.userInfo)
  const { t: translation } = useTranslation()
  const location = useLocation()
  const tabValue = location.state.tabValue || '1'

  const [value, setValue] = useState(tabValue)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const styles = {
    tab: {
      textTransform: 'none',
      ':hover': {
        color: 'var(--color-primary)'
      },
      '&.Mui-selected': {
        color: 'var(--color-primary)',
        fontWeight: 'bold'
      },
      borderRadius: 'var(--radius)'
    }
  }

  return (
    <>
      <SEO title={translation('dropdown.accountSettings')} />
      <Layout>
        <Box component="main" sx={{ py: 1, width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                indicatorColor="secondary"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'var(--color-primary)'
                  },
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'center'
                  }
                }}
              >
                <Tab
                  label={translation('accountSetting.account')}
                  value="1"
                  sx={styles.tab}
                />
                <Tab
                  label={translation('accountSetting.settings')}
                  value="2"
                  sx={styles.tab}
                />
                <Tab
                  label={translation('accountSetting.referrals')}
                  value="3"
                  sx={styles.tab}
                />
              </TabList>
            </Box>
            <Container maxWidth="lg">
              <TabPanel value="1" sx={{ marginY: 3, mb: 15 }}>
                <AccountTab info={userInfo}></AccountTab>
              </TabPanel>
              <TabPanel value="2" sx={{ marginY: 3 }}>
                <SettingsTab />
              </TabPanel>
              <TabPanel value="3"></TabPanel>
            </Container>
          </TabContext>
        </Box>
      </Layout>
    </>
  )
}

export default AccountSetting
