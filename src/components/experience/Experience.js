import { React } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, Typography, IconButton, Card } from '@mui/material'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DomainIcon from '@mui/icons-material/Domain'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { VIETNAM_PROVINCE } from '../../utils/constants/province'
import * as moment from 'moment'

const Experience = ({
  experience,
  index,
  deleteExperience,
  toggleEditExpPopup
}) => {
  return (
    <Draggable draggableId={experience.id} index={index}>
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
                {experience.title}
              </Typography>
            </Box>
            <Box className="profile-box__content__experience-company">
              <DomainIcon />
              <Typography className="profile-box__content__experience-company-text">
                {experience.organization}
              </Typography>
            </Box>
            <Box className="profile-box__content__experience-history">
              <WorkHistoryIcon />
              <Typography className="profile-box__content__experience-history-text">
                {moment(experience.startTime, 'YYYY-MM').format('MM-YYYY')}
                &nbsp;to&nbsp;
                {experience.endTime
                  ? moment(experience.endTime, 'YYYY-MM').format('MM-YYYY')
                  : 'Present'}
              </Typography>
            </Box>
            <Box className="profile-box__content__experience-history">
              <LocationOnIcon />
              <Typography className="profile-box__content__experience-history-text">
                {
                  VIETNAM_PROVINCE.find((p) => p.value === experience.location)
                    .label
                }
              </Typography>
            </Box>
          </Box>
          <Box className="profile-box__content__action">
            <IconButton
              edge="end"
              aria-label="Edit experience"
              sx={{ mr: '5px' }}
              onClick={() => toggleEditExpPopup(experience.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Delete experience"
              sx={{ mr: '5px' }}
              onClick={() => deleteExperience(experience.id)}
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
