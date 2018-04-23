import React from 'react'
import styled from 'styled-components'
const SideBar = styled.div`
  width: 150px;
  @media (min-width: 768px) {
    width: 250px;
  }
  ${props => props.distance < 0 && `
    position: fixed;
    top: 0;
  `}
`

const Sidebar = (props) => (
  <SideBar className='pt-3 px-0' distance={props.dis}>
    <div className='border p-3'>
      <h2>Action</h2>
      <div>
        <button className='btn btn-primary btn-block'>สร้าง issue</button>
      </div>
      <hr />
      <h2>Filter</h2>
      <div className='form-group'>
        <label>priority</label>
        <select className='form-control'>
          <option>Default select</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>time</label>
        <select className='form-control'>
          <option>Default select</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <div>
          <label>{`แก้ปัญหายัง`}</label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            className='form-check-input'
            name={`solve`}
            type='radio'
            id='inlineCheckbox1'
            value='option1'
          />
          <label className='form-check-label' htmlFor='inlineCheckbox1'>
            {`แก้แล้ว`}
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            className='form-check-input'
            name={`solve`} type='radio'
            id='inlineCheckbox2'
            value='option2'
          />
          <label className='form-check-label' htmlFor='inlineCheckbox2'>
            {`ยังไม่ได้แก้`}
          </label>
        </div>
      </div>
    </div>
  </SideBar>
)

export default Sidebar
