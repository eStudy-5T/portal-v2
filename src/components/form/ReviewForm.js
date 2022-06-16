import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Mui Components
import { Rating } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

// Services
import courseService from '../../services/course-service'

// Validators
import { getValidationHelperText } from '../../utils/helpers/validation-helper'

function ReviewForm(props) {
  const [isLoading, setIsLoading] = useState(false)
  const { t: translation } = useTranslation()
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      rate: 0
    }
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }
    setIsLoading(true)
    data.timestamp = Date.now()
    data.firstName = props.firstName
    data.lastName = props.lastName
    courseService
      .submitReview(props.courseId, data)
      .then(() => {
        navigate('#')
        toast.success(translation('courseDetails.thankYouForYourReview'))
      })
      .catch(() => {})
    setIsLoading(false)
  }

  return (
    <div className="login-form-box">
      <h5 className="mb-25 text-left fs-35" style={{ marginTop: 30 }}>
        {translation('courseDetails.leaveAReview')}
      </h5>

      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="edu-comment mb--30">
          <div className="thumbnail">
            <img src={props.avatar} alt="Student Thumb" />
          </div>
          <div
            className="comment-content"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className="comment-top">
              <h6 className="title" style={{ marginBottom: 0 }}>
                {props.firstName + ' ' + props.lastName}
              </h6>
              <div className="rating letmeet-course-rating-stars">
                <Controller
                  name="rate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Rating
                      value={Number(value)}
                      onChange={(event) => {
                        const numberValue = Number(event.target.value)
                        onChange(numberValue)
                      }}
                      size="small"
                      icon={
                        <i
                          className="icon-Star"
                          style={{ marginRight: '5px' }}
                        />
                      }
                      emptyIcon={
                        <i
                          className="off icon-Star"
                          style={{ marginRight: '5px' }}
                        />
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="input-box mb--10">
          <input
            className={errors.title && 'input-error'}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'error.emptyField'
            })}
            disabled={isLoading}
          />
          <small>{translation(getValidationHelperText(errors.title))}</small>
        </div>
        <div className="input-box mb--10">
          <textarea
            className={errors.description && 'input-error'}
            type="text"
            placeholder="Your comment..."
            {...register('description', {
              required: 'error.emptyField'
            })}
            disabled={isLoading}
          />
          <small>
            {translation(getValidationHelperText(errors.description))}
          </small>
        </div>

        <button
          className="rn-btn edu-btn btn-medium w-100"
          type="submit"
          disabled={isLoading}
        >
          <span>Submit</span>
        </button>
      </form>
    </div>
  )
}

export default ReviewForm
