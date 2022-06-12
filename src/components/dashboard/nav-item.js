import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button, ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
  const { href, icon, title, ...others } = props
  const location = useLocation()
  const active = href ? location.pathname === href : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Button
        component={Link}
        to={href}
        startIcon={icon}
        disableRipple
        className="dashboard-drawer"
        sx={{
          backgroundColor: active && 'rgba(255,255,255, 0.08)',
          borderRadius: 1,
          color: active ? '#f86f03' : '#fff6f4',
          fontWeight: active && 'fontWeightBold',
          justifyContent: 'flex-start',
          px: 3,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '& .MuiButton-startIcon': {
            color: active ? '#f86f03' : '#fff6f4'
          },
          '&:hover': {
            color: active ? '#f86f03' : '#fff6f4',
            backgroundColor: 'rgba(255,255,255, 0.08)'
          }
        }}
      >
        <Box sx={{ flexGrow: 1, py: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
}

export default NavItem
