import React, { useEffect, useState, Fragment } from 'react'
import ReactCountryFlag from 'react-country-flag'
import i18next from 'i18next'

import { Menu, MenuItem, Box } from '@mui/material'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import styles from '../../assets/styles/globe.styled'

import { languages } from '../../utils/constants/language'

const Globe = () => {
  const currentLanguageCode = localStorage.getItem('language') || 'vi-VN'
  const [currentLanguage, setCurrentLanguage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    setCurrentLanguage(currentLanguageCode.split('-')[1])
  }, [currentLanguageCode])

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageClick = (langCode) => {
    i18next.changeLanguage(langCode)
    setCurrentLanguage(langCode.split('-')[1])
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Box aria-controls="fade-menu" sx={styles.globe} onClick={handleClick}>
        <ReactCountryFlag
          countryCode={currentLanguage}
          style={{
            fontSize: '1.5em',
            marginLeft: 5
          }}
          aria-label={currentLanguage}
          svg
        />
        <ArrowDropDownIcon sx={{ color: '#b8b8b8' }} />
      </Box>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languages.map(({ code, name, countryCode }) => (
          <MenuItem
            selected={code === currentLanguageCode}
            key={code}
            onClick={() => handleLanguageClick(code)}
          >
            <ReactCountryFlag
              countryCode={countryCode}
              style={{
                fontSize: '1.5em',
                marginRight: 10
              }}
              aria-label={name}
              svg
            />
            {name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default Globe
