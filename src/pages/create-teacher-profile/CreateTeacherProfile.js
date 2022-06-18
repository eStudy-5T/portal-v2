import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import { Box, Stepper, Step, StepLabel, Container } from '@mui/material'

const CreateTeacherProfile = () => {
  return (
    <Fragment>
      <SEO title="Create Profile" />
      <Layout compactFooter>
        <Container maxWidth="lg" className="profile-form"></Container>
      </Layout>
    </Fragment>
  )
}

export default CreateTeacherProfile
