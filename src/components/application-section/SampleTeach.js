import React, { useState, Fragment } from 'react'
import { Container, Box, Typography, IconButton, Tooltip } from '@mui/material'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const SampleTeach = ({ teacherAdvancedInfo, handleChangeAdvancedInfo }) => {
  const [uploadVideo, setUploadVideo] = useState(null)

  const onUploadVideo = (event) => {
    event.preventDefault()
    try {
      const file = event.target.files[0]
      console.log('file', file)
      setUploadVideo(file)
    } catch (error) {
      console.log(error)
    }
  }

  const onAddYoutubeLink = () => {}

  const handleDeleteVideo = () => {
    setUploadVideo(null)
  }

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
          <ul style={{ marginBottom: '15px' }}>
            <li className="profile-box__content__sample-teach_list">
              Recommended video length: 3-5 minutes (make sure it is 100mb or
              less)
            </li>
            <li className="profile-box__content__sample-teach_list">
              If uploading your video, check to make sure it is 100mb or less
            </li>
            <li className="profile-box__content__sample-teach_list">
              Show us the space where you will teach
            </li>
            <li className="profile-box__content__sample-teach_list">
              Demonstrate your ability to teach
            </li>
            <li className="profile-box__content__sample-teach_list">
              Share your knowledge! Teach us something that you are excited to
              share with LetMeet students.
            </li>
          </ul>
          <Box>
            <label className="profile-box__content__sample-teach_btn mb--10">
              <input
                name="sampleTeaching"
                type="file"
                accept="image/*"
                onChange={onUploadVideo}
                hidden
              />
              Upload Video
            </label>
            {uploadVideo && (
              <Fragment>
                <Typography
                  variant="subtitle"
                  sx={{ ml: 1.5, fontStyle: 'italic' }}
                >
                  <VideoFileIcon sx={{ mr: 0.5 }} />
                  {uploadVideo.name}
                </Typography>
                <IconButton sx={{ ml: 2 }} onClick={handleDeleteVideo}>
                  <Tooltip title="Remove video">
                    <DeleteForeverIcon />
                  </Tooltip>
                </IconButton>
              </Fragment>
            )}
          </Box>
          <Typography
            variant="h6"
            className="profile-box__content__sample-teach_text mb--10"
          >
            Or you can upload through Youtube:
          </Typography>
          <input
            className="profile-box__content__sample-teach_input"
            id="sample-teach-youtube"
            type="text"
            name="sampleTeaching"
            placeholder="Enter your Youtube link here"
            onChange={onAddYoutubeLink}
            disabled={uploadVideo}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default SampleTeach
