import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import Button, { Label, Icon, Input } from 'semantic-ui-react'
import Link from 'next/link'

export const Badge = styled(Label)`
  overflow: hidden;
  text-overflow: ellipsis; 
  width: 12em;
`
const SearchInput = styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`

export const documentHeader = {
  Header: 'Document',
  accessor: 'documents',
  style: {textAlign: 'center'},
  Cell: props => {
    let doc = []
    props.value.map(data => {
      doc[data.type_id - 1] = data
    })
    return (
      <div>
        {doc.map((data, i) => data && data.type_id !== 1 ? <Badge key={i} color={checkDocStatus(data.is_approve)}>
          {checkTypeId(data.type_id)}
        </Badge> : <span />)
        }
      </div>
    )
  }
}

export const checkDocStatus = (status) => {
  switch (status) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case null:
      return 'yellow'
    default:
      return ''
  }
}
export const checkTypeId = (id) => {
  switch (id) {
    case 1:
      return 'โปรไฟล์'
    case 2:
      return 'ใบอณุญาติผปค.'
    case 3:
      return 'ปพ.1'
    default:
      return 'null'
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
    await this.setState({ page: this.state.page - 1 })
    this.savePage()
  }

  setPage (e) {
    this.setState({page: e.target.value - 1})
  }

  savePage () {
    window.localStorage.setItem('currentPage', this.state.page)
  }

  componentWillMount = async () => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/approve', {
      Authorization: `Bearer ${token}`
    })
    let result = data.map((profile) => ({
      ...profile,
      documents: profile.documents.filter((doc) => doc.type_id !== 1)
    }))
    let page = window.localStorage.getItem('currentPage')
    result = result.filter(profile => profile.documents.length)
    this.setState({res: result, search: result})
    page == null ? this.setState({page: 0}) : this.setState({page: page})
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
      margin-left: 8px;
      margin-right: 8px;
      width: 20px;
    `
    const TableColumns = [
      {Header: '#', accessor: 'user_id', width: 100, style: {textAlign: 'center'}},
      {Header: 'FirstName',
        accessor: 'first_name',
        width: 150,
        filterMethod: (filter, row) => {
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value)
        }
      },
      {Header: 'LastName', width: 150, accessor: 'last_name'},
      documentHeader,
      {Header: '',
        width: 150,
        style: {textAlign: 'center'},
        Cell: props => <div>
          <Link href={{ pathname: '/verify', query: { user_id: props.original.user_id } }}>
            <a className='btn btn-primary' > approve</a>
          </Link>
          {/* <Button onClick={() => Router.push({
            pathname: '/verify',
            query: { user_id: props.original.user_id }
          })} icon color='blue' >
            <Icon name='search' />
            approve
          </Button> */}
        </div>
      }
    ]
    return (
      <div className='text-center'>
        <Badge color='green'>ตรวจแล้ว</Badge>
        <Badge color='yellow'>ยังไม่ตรวจ</Badge>
        <Badge color='red'>เอกสารไม่ผ่าน</Badge>
        <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />
        <div>
          <ReactTable defaultPageSize={10} page={this.state.page} className='table' data={this.state.search} columns={TableColumns} />
        </div>
        <div className='input-group' >
          <Button className='btn btn-info form-control' onClick={this.decresePage}>Previous</Button>
          <input className='form-control' onChange={this.setPage} type='number' />
          <Button className='btn btn-info form-control' onClick={this.incresePage}>Next</Button>
        </div>
      </div>
    )
  }
}

export default ApproveTable
