import { React } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, Typography, IconButton, Card } from '@mui/material'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DomainIcon from '@mui/icons-material/Domain'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'

const Experience = ({
  experience,
  index,
  saveExperience,
  deleteExperience,
  isLoading
}) => {
  return (
    <Draggable draggableId={experience.index} index={index}>
      {(provided) => (
        <Box
          component={Card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="profile-box__content__wrapper"
        >
          <Box className="profile-box__content__experience">
            <Box className="profile-box__content__experience-title">
              <AssignmentIndIcon />
              <Typography className="profile-box__content__experience-title-text">
                High school teacher
              </Typography>
            </Box>
            <Box className="profile-box__content__experience-company">
              <DomainIcon />
              <Typography className="profile-box__content__experience-company-text">
                Gia Định High School
              </Typography>
            </Box>
            <Box className="profile-box__content__experience-history">
              <WorkHistoryIcon />
              <Typography className="profile-box__content__experience-history-text">
                March 2019 - Present
              </Typography>
            </Box>
          </Box>
          <Box className="profile-box__content__action">
            <IconButton
              edge="end"
              aria-label="Edit experience"
              sx={{ mr: '5px' }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Delete experience"
              sx={{ mr: '5px' }}
            >
              <DeleteIcon />
            </IconButton>
            <DragHandleIcon fontSize="medium" sx={{ alignSelf: 'center' }} />
          </Box>
        </Box>
      )}
    </Draggable>
  )
}

export default Experience
