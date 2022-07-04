import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const AddExperienceForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {}
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }
  }

  return (
    <div className="login-form-box">
      <form
        className="login-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      ></form>
    </div>
  )
}

export default AddExperienceForm
