import React from 'react'
import { compose, withProps } from 'recompose'
import FormContainer from '../register/FormContainer'
import { fields } from './form.json'

const StepOne = (props) => {
  return (
    <FormContainer
      {...props}
      fields={fields}
      name={`แก้ไขโปรไฟล์`}
      buttonText={`บันทึกโปรไฟล์`}
    />
  )
}

export default compose(
  withProps(
    props => ({
      onSubmit: props.profileSubmit
    })
  )
)(StepOne)
