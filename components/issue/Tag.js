import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTag = styled.div.attrs({
  className: 'd-inline-block mx-2 py-1 px-2 rounded'
})`
  ${props => props.lv === 1 ? `
    background: red;
    color: white;
  ` : props.lv === 2 ? `
    background: orange;
    color: white;
  ` : props.lv === 3 && `
    background: yellow;
  `} 
`

const Tag = ({ priority }) => {
  switch (priority) {
    case 2:
      return <StyledTag lv={priority}>ปานกลาง</StyledTag>
    case 3:
      return <StyledTag lv={priority}>ต่ำ</StyledTag>
    default:
      return <StyledTag lv={priority}>สูง</StyledTag>
  }
}

Tag.propTypes = {
  priority: PropTypes.number.isRequired
}

export default Tag
