import React, { useState, Fragment, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Box, Typography, Divider, IconButton } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import CustomDialog from '../dialog/CustomDialog'
import ExperienceForm from '../form/ExperienceForm'
import Experience from '../experience/Experience'
import debounce from 'lodash/debounce'

const ExperienceInformation = ({
  experiences,
  handleAddExperiences,
  handleDeleteExperience,
  handleChangeAdvancedInfo,
  handleEditExperience
}) => {
  const { t: translation } = useTranslation()
  const [expEditing, setExpEditing] = useState(null)
  const [isAddExperience, setAddExperience] = useState(false)
  const [isEditExperience, setEditExperience] = useState(false)

  // eslint-disable-next-line
  const debounceSaveDnD = useCallback(
    debounce(
      (newExperiences, field) =>
        handleChangeAdvancedInfo(newExperiences, field),
      300
    ),
    []
  )

  const handleToggleAddExpPopup = (status) => {
    setAddExperience(status)
  }

  const handleToggleEditExpPopup = (status) => {
    setEditExperience(status)
  }

  const toggleEditExpPopup = (id) => {
    const data = experiences.find((exp) => {
      return exp.id.toString() === id.toString()
    })
    setExpEditing(data)
    setEditExperience(true)
  }

  const onEditExperience = (data) => {
    setExpEditing(null)
    setEditExperience(false)
    handleEditExperience(data)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      return result
    }

    const newExperiences = reorder(
      experiences,
      result.source.index,
      result.destination.index
    )

    debounceSaveDnD(newExperiences, 'experiences')
  }

  return (
    <Fragment>
      <Box className="profile-box">
        <Box className="profile-box__header">
          <Typography variant="h5" fontSize="22px" fontWeight={600}>
            {translation('teacherProfile.experience')}
          </Typography>
          <IconButton
            aria-label="Add jobs"
            onClick={() => handleToggleAddExpPopup(true)}
          >
            <AddCircleOutlineRoundedIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: '#E0E0E0' }} />
        <Box className="profile-box__content" sx={{ textAlign: 'center' }}>
          {!!experiences?.length ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {experiences.map((exp, index) => (
                      <Experience
                        key={exp.id}
                        experience={exp}
                        index={index}
                        deleteExperience={handleDeleteExperience}
                        toggleEditExpPopup={toggleEditExpPopup}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <Typography variant="subtitle">
              {translation('teacherProfile.click')}{' '}
              <AddCircleOutlineRoundedIcon />{' '}
              {translation('teacherProfile.clickAdd')}
            </Typography>
          )}
        </Box>
      </Box>
      {/* Popup add experience here */}
      <CustomDialog
        fullWidth
        customStyle
        title={translation('teacherProfile.addExperienceTitle')}
        open={isAddExperience}
        setOpen={handleToggleAddExpPopup}
      >
        <ExperienceForm
          successBtnText={translation('teacherProfile.add')}
          setOpen={handleToggleAddExpPopup}
          handleAddExperience={handleAddExperiences}
        />
      </CustomDialog>
      {/* Popup edit experience here */}
      <CustomDialog
        fullWidth
        customStyle
        title={translation('teacherProfile.editExperienceTitle')}
        open={isEditExperience}
        setOpen={handleToggleEditExpPopup}
      >
        <ExperienceForm
          successBtnText={translation('teacherProfile.edit')}
          setOpen={handleToggleEditExpPopup}
          editData={expEditing}
          isEditing={isEditExperience}
          handleEditExperience={onEditExperience}
        />
      </CustomDialog>
    </Fragment>
  )
}

export default ExperienceInformation
