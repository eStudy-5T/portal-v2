import React, { useState, Fragment, useRef } from 'react'
import { Container, Box, Typography, IconButton, Tooltip } from '@mui/material'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  validateYoutubeLink,
  validateVideoType
} from '../../utils/validators/field-validators'

const SampleTeach = ({ handleChangeAdvancedInfo }) => {
  // 👇️ create a ref for the file input
  const uploadVideoRef = useRef(null)
  const [uploadVideo, setUploadVideo] = useState(null)
  const [youtubeLink, setYoutubeLink] = useState(null)
  const [errorLink, setErrorLink] = useState(null)
  const [errorUpload, setErrorLoad] = useState(null)

  const onUploadVideo = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setErrorLoad(null)
      setUploadVideo(null)
      handleChangeAdvancedInfo(null, 'sampleTeaching')
    } else {
      if (validateVideoType(file)) {
        setUploadVideo(file)
        handleChangeAdvancedInfo(file, 'sampleTeaching')
        if (errorUpload) {
          setErrorLoad(null)
        }
      } else {
        setUploadVideo(null)
        setErrorLoad(
          'File not support. We only support these types: webm, mp4, ogg'
        )
        handleChangeAdvancedInfo(null, 'sampleTeaching')
      }
    }
    event.target.value = null
  }

  const onAddYoutubeLink = (event) => {
    const link = event.target.value
    if (!link) {
      setErrorLink(null)
      setYoutubeLink(null)
      handleChangeAdvancedInfo(null, 'sampleTeaching')
    } else {
      if (validateYoutubeLink(link)) {
        setYoutubeLink(link)
        handleChangeAdvancedInfo(link, 'sampleTeaching')
        if (errorLink) {
          setErrorLink(null)
        }
      } else {
        setErrorLink('Youtube link is not correct')
        handleChangeAdvancedInfo(null, 'sampleTeaching')
      }
    }
  }

  const handleDeleteVideo = () => {
    uploadVideoRef.current.value = null
    setErrorLoad(null)
    setUploadVideo(null)
    handleChangeAdvancedInfo(null, 'sampleTeaching')
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
            <label
              className={`profile-box__content__sample-teach_btn mb--10 ${
                youtubeLink ? 'disabled' : ''
              }`}
            >
              <input
                ref={uploadVideoRef}
                name="sampleTeaching"
                type="file"
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
          <div>
            <small style={{ color: 'red' }}>{errorUpload}</small>
          </div>
          <Typography
            variant="h6"
            className="profile-box__content__sample-teach_text mb--10"
          >
            Or you can upload through Youtube:
          </Typography>
          <input
            className={`profile-box__content__sample-teach_input ${
              errorLink ? 'input-error' : ''
            }`}
            id="sample-teach-youtube"
            type="text"
            name="sampleTeaching"
            placeholder="Enter your Youtube link here"
            onChange={onAddYoutubeLink}
            disabled={uploadVideo}
          />
          <div>
            <small style={{ color: 'red' }}>{errorLink}</small>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default SampleTeach
