import React, { Fragment } from 'react'
import SEO from '../../common/SEO'
import Header from '../../common/header/Header'
import CourseBasicInfo from '../../components/wizard-create-course/CourseBasicInfo'
import CourseConfirmation from '../../components/wizard-create-course/CourseConfirmation'
import { Box, Stepper, Step, StepLabel, Container } from '@mui/material'

const steps = ['Course Overview', 'Confirmation']

const NewCourse = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CourseBasicInfo />
      case 1:
        return <CourseConfirmation />
      default:
        return 'Unknown step'
    }
  }

  return (
    <>
      <SEO title="Create Cousre" />
      <Header styles="header-style-2" />
      <Box sx={{ marginTop: '1.1em' }}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <Container maxWidth="xl" sx={{ mb: 5 }}>
            {/* Wizard step */}
            {getStepContent(activeStep)}
            {/* Wizard Tool */}
            <Fragment>
              {activeStep === steps.length ? (
                <Fragment>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'right'
                    }}
                  >
                    <button className="rn-btn edu-btn" onClick={handleReset}>
                      Finish
                    </button>
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%'
                    }}
                  >
                    {!!activeStep && (
                      <button
                        color="inherit"
                        className="rn-btn edu-btn"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                    )}
                    <Box sx={{ flex: '1 1 auto' }} />
                    <button className="rn-btn edu-btn" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </Box>
                </Fragment>
              )}
            </Fragment>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default NewCourse
