import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Label, Input } from 'semantic-ui-react'
import Link from 'next/link'

// #####################################
// FILTER DOCUMENT ID = 4 ONLY !
// #####################################

export const Badge = styled(Label)`
  overflow: hidden;
  text-overflow: ellipsis; 
  width: 12em;
`
const SearchInput = styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`

export const checkDocStatus = (status) => {
  switch (status) {
    case 0:
      return {
        name: 'ตรวจไม่ผ่าน',
        color: 'red'
      }
    case 1:
      return {
        name: 'ตรวจผ่านแล้ว',
        color: 'green'
      }
    case undefined || null:
      return {
        name: 'ยังไม่ตรวจ',
        color: 'yellow'
      }
    default:
      return {
        name: 'ยังไม่อัพโหลด',
        color: 'grey'
      }
  }
}

export const documentHeader = {
  Header: 'สถานะสลิป',
  accessor: 'profile.documents',
  style: {textAlign: 'center'},
  Cell: (props) => {
    const doc = props.original.document
    let docStatus
    if (!doc.length > 0) {
      docStatus = checkDocStatus(false)
    } else {
      docStatus = checkDocStatus(doc[doc.length - 1].is_approve)
    }
    return (
      <Badge color={docStatus.color}>
        {docStatus.name}
      </Badge>)
  }
}

class ApproveTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      res: [],
      search: [],
      page: 0
    }
    this.incresePage = this.incresePage.bind(this)
    this.decresePage = this.decresePage.bind(this)
    this.setPage = this.setPage.bind(this)
    this.savePage = this.savePage.bind(this)
  }

  async incresePage () {
    await this.setState({ page: this.state.page + 1 })
    this.savePage()
  }

  async decresePage () {
    if (this.state.page - 1 >= 0) {
      await this.setState({ page: this.state.page - 1 })
      this.savePage()
    }
  }

  setPage (e) {
    this.setState({page: e.target.value - 1})
  }

  savePage () {
    window.localStorage.setItem('currentPage', this.state.page)
  }

  componentWillMount = async () => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/slips', {
      Authorization: `Bearer ${token}`
    })
    let newData = data.map(itim => {
      return {
        itim,
        document: itim.profile.documents.filter(doc => {
          return doc.type_id === 4
        })
      }
    })
    console.log(newData)
    this.setState({res: newData, search: newData})
  }
  searchCamper = async (e) => {
    this.setState({ ...this.state, search: this.state.res })
    let input = e.target.value
    let msg = input.toUpperCase()
    if (msg.length === 0) this.setState({ search: this.state.res })
    else {
      let res = await this.state.search.filter(input => input.first_name.toUpperCase().indexOf(msg) > -1 || input.last_name.toUpperCase().indexOf(msg) > -1 || input.user_id.toString().indexOf(msg) > -1)
      await this.setState({...this.state, search: res})
    }
  }
  render () {
    const Button = styled.button`
      padding-left:8px;
      margin-right: 8px;
      width: 30px;
    `
    console.log()
    const Pageignation = () => (
      <div className='input-group' >
        <Button className='btn btn-info form-control' onClick={this.decresePage}>Previous</Button>
        <input className='form-control' value={this.state.page + 1} style={{marginRight: '8px'}} onChange={this.setPage} type='number' min='1' />
        <Button className='btn btn-info form-control' onClick={this.incresePage}>Next</Button>
      </div>
    )
    const TableColumns = [
      {Header: '#', accessor: 'itim.profile.user_id', width: 100, style: {textAlign: 'center'}},
      {Header: 'ชื่อจริง',
        accessor: 'itim.profile.first_name',
        width: 150,
        filterMethod: (filter, row) => {
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value)
        }
      },
      {Header: 'นามสกุล', width: 150, accessor: 'itim.profile.last_name'},
      {Header: 'เบอร์โทรน้อง', width: 150, accessor: 'itim.profile.profile_registrant.telno_personal'},
      documentHeader,
      {Header: '',
        width: 150,
        style: {textAlign: 'center'},
        Cell: props => {
          let doc = props.original.document[props.original.document.length - 1]
          return (
            <div>
              <Link href={{ pathname: '/verifyslip', query: { docId: doc && doc.id } }}>
                <a className={`btn ${(doc && doc.id && 'btn-primary') || 'disabled'}`} >
                  { doc && doc.id ? 'ตรวจสลิป' : 'ยังไม่อัพโหลด'}
                </a>
              </Link>
            </div>
          )
        }
      }
    ]
    return (
      <div className='text-center'>
        <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />
        <div>
          <ReactTable PaginationComponent={Pageignation} defaultPageSize={10} page={this.state.page} className='table' data={this.state.search} columns={TableColumns} />
        </div>
      </div>
    )
  }
}

export default ApproveTable
