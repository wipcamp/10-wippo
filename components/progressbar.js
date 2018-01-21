import React from 'react'
import styled from 'styled-components'
export default props => {
  const Progress = styled.div`
    width:${props.width}%;
  `
  return (
    <div>
      <Progress>
        <div className='progress-bar progress-bar-warning progress-bar-striped progress-bar-animated' >
          &nbsp;
        </div>
      </Progress>
    </div>
  )
}
