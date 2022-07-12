import React, { Fragment, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CKEditor } from 'ckeditor4-react'
import {
  Box,
  Grid,
  Typography,
  IconButton,
  InputLabel,
  Button,
  Tooltip
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import { validateVideoType } from '../../utils/validators/field-validators'
import get from 'lodash/get'

const AdvancedInformation = ({
  courseAdvancedData,
  handleChangeAdvancedData
}) => {
  console.log('courseAdvancedData', courseAdvancedData)
  const { t: translation } = useTranslation()
  const uploadVideoRef = useRef(null)
  const defaultThumbnailImage = '/images/create-course/upload-image.png'
  const [courseThumbnailImage, setCourseThumbnailImage] = useState(null)
  const [uploadVideo, setUploadVideo] = useState(null)

  console.log('jejej', get(courseAdvancedData, 'whatStudentsGets'))

  const onUploadImage = async (event) => {
    event.preventDefault()
    try {
      const file = event.target.files[0]
      setCourseThumbnailImage(file)
      handleChangeAdvancedData(file, 'courseThumbnailImage')
    } catch (error) {
      console.log(error)
    }
  }

  const onUploadVideo = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setUploadVideo(null)
    } else {
      if (validateVideoType(file)) {
        setUploadVideo(file)
        handleChangeAdvancedData(file, 'courseThumbnailVideo')
      } else {
        setUploadVideo(null)
      }
    }
    event.target.value = null
  }

  const handleDeleteVideo = () => {
    uploadVideoRef.current.value = null
    setUploadVideo(null)
  }

  const onChangeCKEditor = (event) => {
    handleChangeAdvancedData(event.editor.getData(), 'whatStudentsGets')
  }

  return (
    <Fragment>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12} md={6}>
            <InputLabel
              htmlFor="course-thumbnail-image"
              className="basic-info__input-label"
            >
              {translation('manageCourse.courseThumbnailImage')}
            </InputLabel>
            <Button
              component="label"
              className="profile-box__avatar-btn"
              sx={{ mt: 0.5, mb: 2, mr: 10 }}
            >
              <input
                name="courseThumbnailImage"
                type="file"
                accept="image/*"
                onChange={onUploadImage}
                hidden
              />
              {translation('manageCourse.uploadThumbnail')}
            </Button>
            <br />
            {courseAdvancedData?.courseThumbnailImage &&
            typeof courseAdvancedData?.courseThumbnailImage === 'string' &&
            courseAdvancedData?.courseThumbnailImage !== 'null' ? (
              <img
                src={courseAdvancedData?.courseThumbnailImage}
                alt="Thumbnail Course"
              />
            ) : (
              <img
                src={
                  courseThumbnailImage
                    ? URL.createObjectURL(courseThumbnailImage)
                    : defaultThumbnailImage
                }
                alt="Thumbnail"
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              htmlFor="course-thumbnail-video"
              className="basic-info__input-label"
            >
              {translation('manageCourse.courseThumbnailVideo')}
            </InputLabel>
            <Box spacing={2}>
              <Button
                component="label"
                className="profile-box__avatar-btn"
                sx={{ mt: 0.5, mb: 2 }}
              >
                <input
                  ref={uploadVideoRef}
                  name="courseThumbnailVideo"
                  type="file"
                  onChange={onUploadVideo}
                  accept="image/*"
                  hidden
                />
                {translation('manageCourse.uploadThumbnail')}
              </Button>
            </Box>
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
            <div className="thumbnail video-popup-wrapper">
              <video width="100%" controls>
                <source
                  src={courseAdvancedData?.courseThumbnailVideo}
                  type="video/mp4"
                />
              </video>
            </div>
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <InputLabel
              htmlFor="course-thumbnail-video"
              className="basic-info__input-label"
              sx={{ mb: 2 }}
            >
              {translation('manageCourse.whatStudentsGet')}
              <Tooltip title={translation('manageCourse.hintWhatStudentsGet')}>
                <HelpOutlineIcon
                  sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                />
              </Tooltip>
            </InputLabel>
            {courseAdvancedData?.whatStudentsGets && (
              <CKEditor
                initData={get(courseAdvancedData, 'whatStudentsGets')}
                data={get(courseAdvancedData, 'whatStudentsGets')}
                onChange={onChangeCKEditor}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default AdvancedInformation
