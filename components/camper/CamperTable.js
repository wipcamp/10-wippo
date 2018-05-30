import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ReactTable from 'react-table'
import { Button } from 'semantic-ui-react'

import getCookie from '../util/cookie'
import axios from '../util/axios'
import { SearchInput } from '../layout/input'
import Modal from './ConfirmModal'

import flavors from './flavors.json'

const StyledReactTable = styled(ReactTable)`
  text-align:center;
`

const CustomButtom = styled(Button)`
  font-family: 'Prompt' !important;
`

const ButtonFlavor = styled.button`
  font-family: 'Prompt';
  width: 130px;
  font-size: 1em;
  padding: .3em 1em;
  @media (max-width: 1024px) {
    font-size: 1em;
  }
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
    width: 120
  },
  {
    Header: 'โรงเรียน',
    accessor: 'profile_registrant.edu_name',
    width: 180
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
    Header: 'โรคประจำตัว',
    accessor: 'profile.congenital_diseases',
    width: 120
  },
  {
    Header: 'ยาที่แพ้',
    accessor: 'profile.congenital_drugs',
    width: 100
  },
  {
    Header: 'ห้องนอน',
    accessor: 'bedroom',
    width: 100
  },
  {
    Header: 'ห้องเรียน',
    accessor: 'classroom',
    width: 100
  },
  {
    Header: 'เบอร์โทรน้อง',
    accessor: 'profile_registrant.telno_personal',
    width: 140
  },
  {
    Header: 'เบอร์โทรผู้ปกครอง',
    accessor: 'profile_registrant.telno_parent',
    width: 140
  },
  {
    Header: 'จังหวัด',
    accessor: 'profile_registrant.addr_prov',
    width: 130
  },
  {
    Header: 'รส',
    accessor: 'section_id',
    width: 100,
    Cell: ({ original: {section_id: sectionId} }) => (
      <div>
        { flavors.filter((data) => data.id === sectionId)[0].displayName }
      </div>
    )
  },
  {
    Header: 'โปรไฟล์',
    accessor: 'user_id',
    width: 70,
    Cell: ({value}) => (
      <a target='_blank' href={`/itim?user_id=${value}`}>
        <Button icon='search' color='blue' />
      </a>
    )
  }
]

export default class CamperTable extends React.Component {
  state = {
    campers: [],
    tempCampers: [],
    open: false,
    changing: {}
  }

  handleFields = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  fetchCampers = async () => {
    let { token } = await getCookie({ req: false })
    let { data: { data: campers } } = await axios.get('/campers', {
      Authorization: `Bearer ${token}`
    })
    this.setState({
      campers,
      tempCampers: campers
    })
  }
  async componentDidMount () {
    this.fetchCampers()
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
            >ดูทุกรส</ButtonFlavor>
          </div>
          <div className='row px-3'>
            {
              flavors.map(data => <ButtonFlavor
                onClick={() => this.filterFlavor(data.id)}
                key={data.id}
                style={{ background: `${data.color}`, color: `${data.font}` }}
                className={`col-6 col-md-2 btn`}
              >{data.displayName} ({this.state.tempCampers.filter(camper => camper.section_id === data.id).length} คน)</ButtonFlavor>)
            }
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-7 col-md-9'>
          <SearchInput
            onChange={this.searchCamper}
            type='text'
            icon='search'
            placeholder='Search...'
          />
        </div>
        <div className='col-5 col-md-3 text-center'>
          <CustomButtom
            onClick={() => this.fetchCampers()}
            content='ดึงข้อมูลใหม่'
            icon='refresh'
            color='violet'
            labelPosition='left'
          />
        </div>
      </div>
      <StyledReactTable
        data={this.state.campers}
        columns={columns}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            'onChange': this.handleFields
          }
        }}
      />
      <Modal
        handleFields={this.handleFields}
        confirm={updateSection}
        data={this.state.changing}
        open={this.state.open}
        reload={this.fetchCampers}
      />
    </div>
    )
  }
}
