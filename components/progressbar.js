import React from 'react'
import styled from 'styled-components'
export default props => {
  const Progress = styled.div`
    width:${props.width}%;
  `
  return (
    <div>
      <Progress>
        <div className='progressbar progress-bar progress-bar-warning active' >
          &nbsp;
        </div>
      </Progress>
    </div>
  )
}
