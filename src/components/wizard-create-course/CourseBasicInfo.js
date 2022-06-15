import React, { Fragment, useState, useEffect } from 'react'
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
import { COURSE_TYPE } from '../../utils/constants/misc'
import { COURSE_GRADE } from '../../utils/constants/course-grade'
import courseService from '../../services/course-service'

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

const CourseBasicInfo = ({
  courseBasicData,
  handleChangeBasicData,
  handleChangeMultiSelect
}) => {
  const [tagsData, setTagsData] = useState([])
  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const [subOptions, setSubOptions] = useState([])

  useEffect(() => {
    const fetchCategoriesAndSubjects = async () => {
      const cats = await courseService.getCategoryOptions()
      const subs = await courseService.getSubjectOptions()
      setCategories(
        cats.data.map((cat) => ({ value: cat.id, label: cat.name }))
      )
      setSubjects(subs.data)
    }

    fetchCategoriesAndSubjects()
  }, [])

  useEffect(() => {
    if (courseBasicData.tags && !!courseBasicData.tags.length) {
      const tags = courseBasicData.tags.map((tag) => {
        return colourOptions.find((option) => option.value === tag)
      })
      setTagsData(tags)
    }

    if (courseBasicData.categoryId) {
      const subjectOptions = subjects
        .map((subject) => {
          if (subject.categoryId === courseBasicData.categoryId) {
            return { value: subject.id, label: subject.name }
          }
          return null
        })
        .filter((e) => e)
      console.log('subjectOptions', subjectOptions)
      setSubOptions(subjectOptions)
    }
  }, [subjects, courseBasicData.tags, courseBasicData.categoryId])

  const handleSelectTags = (newValue, actionMeta) => {
    setTagsData(newValue)
    handleChangeMultiSelect(newValue, 'tags', 'basic')
  }

  const handleChangeFieldData = (event, field) => {
    const selectField = /categoryId|subjectId|grade/
    if (selectField.test(field)) {
      handleChangeBasicData(event?.value, field)

      if (field === 'categoryId' && event?.value) {
        console.log('subjects', subjects)
        console.log('event.value', event.value)
        const subjectOptions = subjects
          .map((subject) => {
            if (subject.categoryId === event.value) {
              return { value: subject.id, label: subject.name }
            }
            return null
          })
          .filter((e) => e)
        console.log('subjectOptions', subjectOptions)
        setSubOptions(subjectOptions)
      }
    } else {
      const inputFieldName = event.target.name
      const value = event.target.value
      handleChangeBasicData(
        inputFieldName === 'maxStudentNumber' ? Number(value) : value,
        inputFieldName
      )
    }
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
              name="type"
              value={courseBasicData.type || COURSE_TYPE.RUNNING}
              onChange={handleChangeFieldData}
            >
              <FormControlLabel
                value={COURSE_TYPE.RUNNING}
                control={<Radio sx={styles.radio} />}
                label="Learning Course. I have completed planning course schedule timeline for LetMeet student to enroll. My course is finished and ready for teaching"
              />
              <FormControlLabel
                value={COURSE_TYPE.MARKETING}
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
                name="title"
                value={courseBasicData.title || ''}
                onChange={handleChangeFieldData}
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
                name="slug"
                value={courseBasicData.slug || ''}
                onChange={handleChangeFieldData}
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
                name="maxStudentNumber"
                value={courseBasicData.maxStudentNumber || ''}
                onChange={handleChangeFieldData}
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
                name="description"
                value={courseBasicData.description || ''}
                onChange={handleChangeFieldData}
                required
              ></textarea>
            </Grid>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="course-category"
                className="basic-info__input-label"
                required
              >
                Course Category
              </InputLabel>
              <Select
                id="course-category"
                className="basic-single"
                classNamePrefix="select"
                placeholder="Select here"
                isClearable={true}
                isSearchable={true}
                name="categoryId"
                options={categories}
                value={
                  categories.find(
                    (option) => option.value === courseBasicData.categoryId
                  ) || ''
                }
                onChange={(event) => handleChangeFieldData(event, 'categoryId')}
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
                name="subjectId"
                options={subOptions}
                isDisabled={!courseBasicData.categoryId}
                value={
                  subOptions.find(
                    (option) => option.value === courseBasicData.subjectId
                  ) || ''
                }
                onChange={(event) => handleChangeFieldData(event, 'subjectId')}
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
                options={COURSE_GRADE}
                value={
                  COURSE_GRADE.find(
                    (option) => option.value === courseBasicData.grade
                  ) || ''
                }
                onChange={(event) => handleChangeFieldData(event, 'grade')}
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
                value={tagsData}
                onChange={handleSelectTags}
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
