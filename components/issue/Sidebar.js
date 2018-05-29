import React from 'react'
import styled from 'styled-components'
import { problemTypes } from './dropdown.json'

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

const timeOptions = [...new Array(24)].map((d, i) => `${pad(i)}:00 - ${pad(i % 24)}:59`)

const Sidebar = ({
  toggleCreate,
  getIssue,
  setField,
  issue,
  getRoleTeams,
  getStaffs
}) => (
  <SideBar className='pt-3 px-0'>
    <div className='border p-3'>
      <h2>Action</h2>
      <div>
        <button
          className='btn btn-primary btn-block'
          onClick={() => {
            toggleCreate()
            getRoleTeams()
            getStaffs()
          }}
        >สร้าง issue</button>
        <button
          className='btn btn-success btn-block'
          onClick={getIssue}
          disabled={issue.loading}
        >refresh</button>
      </div>
      <hr />
      <h2>Filter</h2>
      <div className='form-group'>
        <label>ความสำคัญ</label>
        <select
          className='custom-select'
          value={issue.filter_priority}
          onChange={e => setField('filter_priority', e.target.value)}
        >
          <option value='0'>ทั้งหมด</option>
          <option value='1'>สูง</option>
          <option value='2'>ปานกลาง</option>
          <option value='3'>ต่ำ</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>เวลา</label>
        <select
          className='custom-select'
          value={issue.filter_time}
          onChange={e => setField('filter_time', e.target.value)}
        >
          <option value='all'>ทั้งหมด</option>
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
        <select
          className='custom-select'
          value={issue.filter_date}
          onChange={e => setField('filter_date', e.target.value)}
        >
          <option value='all'>ทุกวัน</option>
          <option value='30 May 2018'>Day 1 | 30 May 2018</option>
          <option value='31 May 2018'>Day 2 | 31 May 2018</option>
          <option value='1 Jun 2018'>Day 3 | 1 Jun 2018</option>
          <option value='2 Jun 2018'>Day 4 | 2 Jun 2018</option>
          <option value='3 Jun 2018'>Day 5 | 3 Jun 2018</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>สถานะของปัญหา</label>
        <select
          className='custom-select'
          value={issue.filter_solve}
          onChange={e => setField('filter_solve', e.target.value)}
        >
          <option value='2'>โชว์ทั้งหมด</option>
          <option value='1'>ที่แก้แล้ว</option>
          <option value='0'>ที่ยังไม่ได้แก้</option>
        </select>
      </div>
      <hr />
      <div className='form-group'>
        <label>ประเภทของปัญหา</label>
        <select
          className='custom-select'
          value={issue.filter_type}
          onChange={e => setField('filter_type', e.target.value)}
        >
          <option value='all'>โชว์ทั้งหมด</option>
          {
            problemTypes.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  </SideBar>
)

export default Sidebar
