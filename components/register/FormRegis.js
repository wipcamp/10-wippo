import React from 'react'
import { compose, withProps } from 'recompose'
import FormContainer from './FormContainer'
import { fields as field1 } from './form.json'
import { fields as field2 } from './form2.json'

const fields = [
  ...field1,
  {
    component: 'header',
    label: 'ประสบการณ์'
  },
  ...field2
]

const StepOne = (props) => {
  return (
    <FormContainer
      {...props}
      fields={fields}
      buttonText={`ลงทะเบียน`}
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
