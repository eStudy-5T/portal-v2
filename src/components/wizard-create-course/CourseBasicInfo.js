import React, { Fragment, useState } from 'react'
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio
} from '@mui/material'
import ReactTagInput from '@pathofdev/react-tag-input'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const styles = {
  radio: {
    color: '#3d47b4',
    '&.Mui-checked': {
      color: '#525fe1'
    }
  }
}

const CourseBasicInfo = () => {
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [loadingFieldName, setLoadingFieldName] = useState(null)

  const saveTags = (newTags) => {
    console.log('newTags', newTags)
    setTags(newTags)
  }

  return (
    <Fragment>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Box component="form">
          <FormControl required>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: 'bold' }}
            >
              What type of course are you creating
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="consump-course"
            >
              <FormControlLabel
                value="consump-course"
                control={<Radio sx={styles.radio} />}
                label="Running Course. I have completed planning course schedule timeline for LetMeet student to enroll. My course is finished and ready for consumption"
              />
              <FormControlLabel
                value="mkt-course"
                control={<Radio sx={styles.radio} />}
                label=" Marketing Course. I do not want student to enroll my course just yet. At this moment in time, I only want to create a marketing course for promotional purposes"
              />
            </RadioGroup>
          </FormControl>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                required
                htmlFor="course-title"
                className="basic-info__input-label"
              >
                Title
              </InputLabel>
              <input
                id="course-title"
                type="text"
                placeholder="Type here"
                required
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-title"
                className="basic-info__input-label"
                required
              >
                Slug
              </InputLabel>
              <input
                id="course-title"
                type="text"
                placeholder="example-slug"
                required
              />
            </Grid>
          </Grid>
          <Grid container component="main" sx={{ mt: 2 }}>
            <InputLabel
              htmlFor="course-description"
              className="basic-info__input-label"
              required
            >
              Logline or Short Description
            </InputLabel>
            <textarea
              id="course-description"
              placeholder="Type here"
              required
            ></textarea>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-grade"
                className="basic-info__input-label"
                required
              >
                Grade
              </InputLabel>
              <select id="course-grade" required>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-generes"
                className="basic-info__input-label"
                required
              >
                Course Genres
              </InputLabel>
              <ReactTagInput
                required
                id="course-generes"
                tags={tags}
                placeholder="Type and enter"
                disabled={Boolean(loadingFieldName)}
                onChange={saveTags}
              />
            </Grid>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                required
                htmlFor="start-date"
                className="basic-info__input-label"
              >
                Start Date
              </InputLabel>
              <input
                id="start-date"
                type="date"
                placeholder="Type here"
                required
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="end-date"
                className="basic-info__input-label"
                required
              >
                End Date
              </InputLabel>
              <input
                id="end-date"
                type="date"
                placeholder="Type here"
                required
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="total-week"
                className="basic-info__input-label"
              >
                Total Week
              </InputLabel>
              <input id="total-week" type="text" readOnly disabled />
            </Grid>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                required
                htmlFor="lesson-per-week"
                className="basic-info__input-label"
              >
                Lesson per Week
              </InputLabel>
              <input
                id="lesson-per-week"
                type="number"
                placeholder="Type here"
                required
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="total-lesson"
                className="basic-info__input-label"
              >
                Total Lesson in Course
              </InputLabel>
              <input id="total-lesson" type="number" readOnly disabled />
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="allowed-to-absent"
                className="basic-info__input-label"
              >
                Allowed to be absent
              </InputLabel>
              <input
                id="allowed-to-absent"
                type="number"
                placeholder="Type here"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fragment>
  )
}

export default CourseBasicInfo
