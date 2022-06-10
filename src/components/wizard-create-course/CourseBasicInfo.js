import React, { Fragment } from 'react'
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Tooltip
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

const styles = {
  radio: {
    color: '#3d47b4',
    '&.Mui-checked': {
      color: '#525fe1'
    }
  }
}

const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const CourseBasicInfo = () => {
  const handleChangeTags = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }

  const handleChangeCategories = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
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
                label="Learning Course. I have completed planning course schedule timeline for LetMeet student to enroll. My course is finished and ready for teaching"
              />
              <FormControlLabel
                value="mkt-course"
                control={<Radio sx={styles.radio} />}
                label=" Marketing Page. I do not want student to enroll my course yet. At this moment in time, I only want to create a marketing course for promotional purposes"
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
            <Grid item xs={12} md={4} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-slug"
                className="basic-info__input-label"
                required
              >
                Slug
              </InputLabel>
              <input
                id="course-slug"
                type="text"
                placeholder="example-slug"
                required
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-max-student"
                className="basic-info__input-label"
                required
                sx={{ display: 'flex' }}
              >
                Number of students
                <Tooltip title="Maximum number of students allow to enroll">
                  <HelpOutlineIcon
                    sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
              </InputLabel>
              <input
                id="course-max-student"
                type="number"
                placeholder="Type here"
                required
              />
            </Grid>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
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
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-tags"
                className="basic-info__input-label"
                required
              >
                Course Categories
              </InputLabel>
              <CreatableSelect
                id="course-categories"
                className="basic-multi-select"
                classNamePrefix="select"
                name="categories"
                placeholder="Search"
                isMulti
                onChange={handleChangeCategories}
                options={colourOptions}
              />
            </Grid>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-subject"
                className="basic-info__input-label"
                required
              >
                Subject
              </InputLabel>
              <Select
                id="course-subject"
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select here"
                isClearable={true}
                isSearchable={true}
                name="subject"
                options={colourOptions}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-grade"
                className="basic-info__input-label"
                required
              >
                Grade
              </InputLabel>
              <Select
                id="course-grade"
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select here"
                isClearable={true}
                isSearchable={true}
                name="grade"
                options={colourOptions}
              />
            </Grid>
          </Grid>
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-tags"
                className="basic-info__input-label"
                required
              >
                Course Tags
              </InputLabel>
              <CreatableSelect
                id="course-tags"
                className="basic-multi-select"
                classNamePrefix="select"
                name="tags"
                placeholder="Search"
                isMulti
                onChange={handleChangeTags}
                options={colourOptions}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fragment>
  )
}

export default CourseBasicInfo
