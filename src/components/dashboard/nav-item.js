import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button, ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
  const { href, icon, title, isOpen } = props
  const location = useLocation()
  const active = href ? location.pathname === href : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: isOpen ? 2 : 0
      }}
    >
      <Button
        component={Link}
        to={href}
        startIcon={icon}
        disableRipple
        sx={{
          height: '47px',
          backgroundColor: active && 'white',
          borderRadius: isOpen ? 1 : 0,
          color: active ? '#3d47b4' : '#fff6f4',
          justifyContent: 'flex-start',
          px: 3,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '& .MuiButton-startIcon': {
            color: active ? '#3d47b4' : '#fff6f4'
          },
          '&:hover': {
            color: active ? '#3d47b4' : '#fff6f4',
            backgroundColor: active ? 'white' : 'rgba(255,255,255, 0.08)'
          }
        }}
      >
        {isOpen && <Box sx={{ flexGrow: 1 }}>{title}</Box>}
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
