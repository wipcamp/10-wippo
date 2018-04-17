import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ReactTable from 'react-table'

import getCookie from '../util/cookie'
import axios from '../util/axios'
import { SearchInput } from '../itim/DatatableCard'
import flavors from './flavors.json'

const StyledReactTable = styled(ReactTable)`
  text-align:center;
`

const columns = [
  {
    Header: 'WIP ID',
    accessor: 'user_id',
    width: 100
  },
  {
    Header: 'ชื่อเล่น',
    accessor: 'profile.nickname',
    width: 100
  },
  {
    Header: 'โรงเรียน',
    accessor: 'profile_registrant.edu_name',
    width: 240
  },
  {
    Header: 'เพศ',
    accessor: 'profile.gender_id',
    width: 100,
    Cell: ({ value }) => (
      <div>{value === 1 ? 'ชาย' : 'หญิง'}</div>
    )
  },
  {
    Header: 'อาหารที่แพ้',
    accessor: 'profile.allergic_foods',
    width: 120
  },
  {
    Header: 'เกรดเฉลี่ย',
    accessor: 'profile_registrant.edu_gpax',
    width: 100
  },
  {
    Header: 'จัดรส',
    accessor: 'user_id',
    width: 160,
    Cell: ({ original }) => (
      <select defaultValue={original.section_id} className='custom-select'>
        {
          flavors.map(data =>
            <option key={data.id} value={data.id}>{data.displayName}</option>
          )
        }
      </select>
    )
  }
]

const camperFilter = (data, search) => {
  return castString(data.user_id, search) ||
    castString(data.profile.nickname, search) ||
    castString(data.profile_registrant.edu_name, search)
}

const castString = (text, search) => `${text}`.toUpperCase().indexOf(search) > -1

export default class CamperTable extends React.Component {
  state = {
    campers: [],
    tempCampers: []
  }
  async componentDidMount () {
    let { token } = await getCookie({ req: false })
    let { data: { data: campers } } = await axios.get('/campers', {
      Authorization: `Bearer ${token}`
    })
    this.setState({
      campers,
      tempCampers: campers
    })
  }

  searchCamper = async (e) => {
    let { tempCampers } = this.state
    let input = e.target.value
    let search = input.toUpperCase()
    if (search.length === 0) {
      this.setState({ campers: tempCampers })
    } else {
      let result = await tempCampers.filter(data => camperFilter(data, search))
      this.setState({ campers: result })
    }
  }

  filterFlavor = async (e) => {
    let { tempCampers } = this.state
    let result = await tempCampers.filter(data => data.section_id === e)
    this.setState({ campers: result })
  }

  componentWillMount () {
    injectGlobal`
      .text {
        font-family: 'Prompt';
      }
    `
  }
  render () {
    return (<div>
      {flavors.map(data => <button onClick={() => this.filterFlavor(data.id)} key={data.id} style={{ background: `${data.color}` }} className='btn'>{data.displayName}</button>)}
      <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />
      <StyledReactTable data={this.state.campers} columns={columns} />
    </div>
    )
  }
}
