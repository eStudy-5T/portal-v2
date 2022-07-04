import React from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  InputLabel,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const SampleTeach = () => {
  return (
    <Container maxWidth="lg">
      <Box className="profile-box">
        <Box className="profile-box__content">
          <Typography
            variant="h6"
            className="profile-box__content__sample-teach_text mb--10"
          >
            Upload a 3-5 minute video in which you demonstrate a sample of the
            above-mentioned class. This video will be kept private and
            unavailable to students. It allows our team to quickly assess who
            you are and the type of teaching environment you will provide to
            Letmeet learners.
          </Typography>
          <Typography
            variant="h6"
            className="profile-box__content__sample-teach_text mb--5"
          >
            This is some advice for you:
          </Typography>
          <ul style={{ marginBottom: '20px' }}>
            <li>
              Recommended video length: 3-5 minutes (make sure it is 100mb or
              less)
            </li>
            <li>
              If uploading your video, check to make sure it is 100mb or less
            </li>
            <li>Show us the space where you will teach</li>
            <li>Demonstrate your ability to teach</li>
            <li>
              Share your knowledge! Teach us something that you are excited to
              share with LetMeet students.
            </li>
          </ul>
          <label className="profile-box__content__sample-teach_btn mb--15">
            <input name="file" type="file" accept="image/*" hidden />
            Upload Video
          </label>
          <Typography
            variant="h6"
            className="profile-box__content__sample-teach_text mb--15"
          >
            Or you can upload through Youtube:
          </Typography>
          <input
            id="sample-teach-youtube"
            type="text"
            name="sampleTeachYoutube"
            placeholder="Enter your Youtube link here"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default SampleTeach
