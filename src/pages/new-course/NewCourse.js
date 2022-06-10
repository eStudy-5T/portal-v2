import React, { Fragment, useState } from 'react'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseBasicInfo from '../../components/wizard-create-course/CourseBasicInfo'
import CourseConfirmation from '../../components/wizard-create-course/CourseConfirmation'
import CourseSchedule from '../../components/wizard-create-course/CourseSchedule'
import { Box, Stepper, Step, StepLabel, Container } from '@mui/material'

const steps = ['Course Overview', 'Course Schedule', 'Confirmation']

const NewCourse = () => {
  const [isBlocking, setIsBlocking] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  usePrompt('Reload site? Changes you made may not be saved.', isBlocking)

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    scrollTop()
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    scrollTop()
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
        return <CourseSchedule />
      case 2:
        return <CourseConfirmation />
      default:
        return 'Unknown step'
    }
  }

  return (
    <Fragment>
      <SEO title="Create Course" />
      <Layout disableSticky compactFooter>
        <Box sx={{ mt: 4, mb: 8 }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Container maxWidth="lg" className="wizard-form ">
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
      </Layout>
    </Fragment>
  )
}

export default NewCourse
