import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Box, Typography, Divider, IconButton } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Experience from '../../components/experience/Experience'

const Experiences = [
  {
    index: '1',
    title: 'High School Teacher',
    organization: 'Gia Định high school',
    history: {
      startDate: 'March 2022',
      endDate: 'Present'
    }
  },
  {
    index: '2',
    title: 'Student',
    organization: 'Gia Định high school',
    history: {
      startDate: 'March 2022',
      endDate: 'Present'
    }
  },
  {
    index: '3',
    title: 'Teacher Assistant',
    organization: 'Gia Định high school',
    history: {
      startDate: 'March 2022',
      endDate: 'Present'
    }
  }
]

const ExperienceInfomation = () => {
  const onDragEnd = (result) => {
    console.log('result', result)
  }

  return (
    <Box className="profile-box">
      <Box className="profile-box__header">
        <Typography variant="h5" fontSize="22px" fontWeight={600}>
          Education and Teach Experience
        </Typography>
        <IconButton aria-label="Add jobs">
          <AddCircleOutlineRoundedIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: '#E0E0E0' }} />
      <Box className="profile-box__content" sx={{ textAlign: 'center' }}>
        {/* <Typography variant="subtitle">
          Click <AddCircleOutlineRoundedIcon /> to add new education or
          experience
        </Typography> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {Experiences.map((exp, index) => (
                  <Experience key={exp.index} experience={exp} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  )
}

export default ExperienceInfomation
