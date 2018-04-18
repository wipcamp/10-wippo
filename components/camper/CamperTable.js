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

const ButtonFlavor = styled.button`
  font-family: 'Prompt';
  width: 130px;
  font-size: 1.3em;
  padding: .3em 1em;
`

const camperFilter = (data, search) => {
  return castString(data.user_id, search) ||
    castString(data.profile.nickname, search) ||
    castString(data.profile_registrant.edu_name, search)
}

const castString = (text, search) => `${text}`.toUpperCase().indexOf(search) > -1

const updateSection = async (sectionId, userId) => {
  let { token } = await getCookie({ req: false })
  return axios.put(`/campers/${userId}/flavors`, {
    sectionId
  }, {
    Authorization: `Bearer ${token}`
  })
}

const columns = [
  {
    Header: 'WIP ID',
    accessor: 'user_id',
    width: 100
  },
  {
    Header: 'ชื่อเล่น',
    accessor: 'profile.nickname',
    width: 150
  },
  {
    Header: 'โรงเรียน',
    accessor: 'profile_registrant.edu_name',
    width: 350
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
    Cell: props => (
      <select
        onChange={e => updateSection(e.target.value, props.value)}
        defaultValue={props.original.section_id}
        className='custom-select'
      >
        {
          flavors.map(data =>
            <option key={data.id} value={data.id}>{data.displayName}</option>
          )
        }
      </select>
    )
  }
]

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
    let search = e.target.value.toUpperCase()
    if (search.length === 0) {
      this.setState({ campers: tempCampers })
    } else {
      let result = await tempCampers.filter(data => camperFilter(data, search))
      this.setState({ campers: result })
    }
  }

  filterFlavor = async (e) => {
    let { tempCampers } = this.state
    let campers = tempCampers
    if (!(e === -1)) {
      campers = await campers.filter(data => data.section_id === e)
    }
    this.setState({ campers })
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
      <div className='card my-4'>
        <div className='card-header'>
          <h4>Filter ตามรส</h4>
        </div>
        <div className='card-body'>
          <div className='row px-3'>
            <ButtonFlavor
              onClick={() => this.filterFlavor(-1)}
              className='col-12 col-md-2 btn btn-primary'
            >All</ButtonFlavor>
            <br />
            {
              flavors.map(data => <ButtonFlavor
                onClick={() => this.filterFlavor(data.id)}
                key={data.id}
                style={{ background: `${data.color}` }}
                className={`col-6 col-md-2 btn`}
              >{data.displayName}</ButtonFlavor>)
            }
          </div>
        </div>
      </div>
      <SearchInput
        onChange={this.searchCamper}
        type='text'
        icon='search'
        placeholder='Search...'
      />
      <StyledReactTable data={this.state.campers} columns={columns} />
    </div>
    )
  }
}
