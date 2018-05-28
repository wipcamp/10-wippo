import React from 'react'
import { compose, withProps } from 'recompose'
import FormContainer from './FormContainer'
import { fields } from './form.json'

const StepOne = (props) => {
  return (
    <FormContainer
      {...props}
      fields={fields}
      name={`ลงทะเบียนพี่ค่าย`}
      buttonText={`ยืนยันการลงทะเบียน`}
    />
  )
}

export default compose(
  withProps(
    props => ({
      onSubmit: props.registerSubmit
    })
  )
)(StepOne)
