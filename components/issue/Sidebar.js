import React from 'react'
import styled from 'styled-components'
const SideBar = styled.div`
  width: 150px;
  position: sticky;
  top: 0;
  @media (min-width: 768px) {
    width: 250px;
  }
`
const pad = (num) => {
  let s = '' + num
  if (s.length < 2) s = '0' + s
  return s
}

const timeOptions = [...new Array(24)].map((d, i) => `${pad(i)}:01 - ${pad((i + 1) % 24)}:00`)

const Sidebar = (props) => (
  <SideBar className='pt-3 px-0'>
    <div className='border p-3'>
      <h2>Action</h2>
      <div>
        <button
          className='btn btn-primary btn-block'
          onClick={props.toggleCreate}
        >สร้าง issue</button>
        <button
          className='btn btn-success btn-block'
          onClick={props.getIssue}
          disabled={props.issue.loading}
        >refresh</button>
      </div>
      <hr />
      <h2>Filter</h2>
      <div className='form-group'>
        <label>ความสำคัญ</label>
        <select className='custom-select'>
          <option value='0'>ทั้งหมด</option>
          <option value='1'>สูง</option>
          <option value='2'>ปานกลาง</option>
          <option value='3'>ต่ำ</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>เวลา</label>
        <select className='custom-select'>
          <option>ทั้งหมด</option>
          {
            timeOptions.map(d => (
              <option key={d} value={d} >{d}</option>
            ))
          }
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>วัน</label>
        <select className='custom-select'>
          <option value='30 May 2018'>Day 1 | 30 May 2018</option>
          <option value='31 May 2018'>Day 2 | 31 May 2018</option>
          <option value='1 Jun 2018'>Day 3 | 1 Jun 2018</option>
          <option value='2 Jun 2018'>Day 4 | 2 Jun 2018</option>
          <option value='3 Jun 2018'>Day 5 | 3 Jun 2018</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>แก้ปัญหาหรือยัง</label>
        <select className='custom-select'>
          <option value='2'>โชว์ทั้งหมด</option>
          <option value='1'>ที่แก้แล้ว</option>
          <option value='0'>ที่ยังไม่ได้แก้</option>
        </select>
      </div>
      <div className='form-group'>
        <div>
          <label>{`แก้ปัญหายัง`}</label>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                name={`solve`} type='radio'
                id='inlineCheckbox3'
                value='2'
              />
              <label className='form-check-label' htmlFor='inlineCheckbox3'>
                {`ทั้งหมด`}
              </label>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                name={`solve`}
                type='radio'
                id='inlineCheckbox1'
                value='1'
              />
              <label className='form-check-label' htmlFor='inlineCheckbox1'>
                {`แก้แล้ว`}
              </label>
            </div>

          </div>
          <div className='col-md-6'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                name={`solve`} type='radio'
                id='inlineCheckbox2'
                value='0'
              />
              <label className='form-check-label' htmlFor='inlineCheckbox2'>
                {`ยังไม่ได้แก้`}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SideBar>
)

export default Sidebar
