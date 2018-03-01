import React from 'react'
import styled from 'styled-components'

export default class Selectanswer extends React.Component {
  render () {
    const Input = styled.select`
      font-style: italic;
    `
    const Submitbutton = styled.button`
      margin-top:40px;
    `

    return (
      <div>
        <h1>เลือกคำถามที่พี่ wipper ต้องการตรวจเลย!</h1>
        <p className='lead'> (คำบรรยายในการตรวจคำถาม) Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Fusce quis lacus aliquet, bibendum turpis sed, congue lacus.
         Praesent vitae condimentum sem, quis facilisis enim. Maecenas in volutpat sapien.
          Praesent malesuada sapien vel est dapibus finibus. </p>
        <hr className='my-4' />
        <Input className='form-control form-control-lg'>
          <option>เลือกคำถาทที่ต้องการตรวจ</option>
          <option>ข้อ1 wwwwwwwwww</option>
          <option>ข้อ2 wwwwwwwwww</option>
          <option>ข้อ3 wwwwwwwwww</option>
          <option>ข้อ4 wwwwwwwwww</option>
        </Input>
        <div className='col-12 text-right'>
          <Submitbutton className='btn btn-primary btn-lg'>Rock n Roll</Submitbutton>
        </div>
      </div>
    )
  }
}
