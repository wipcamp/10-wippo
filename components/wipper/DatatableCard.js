import React from 'react'
import ReactTable from 'react-table'
import Styled, { injectGlobal } from 'styled-components'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import Link from 'next/link'
import { Input, Icon, Button } from 'semantic-ui-react'

const StyledReactTable = Styled(ReactTable)`
  text-align:center;
`
const SearchInput = Styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`
injectGlobal`
  .ReactTable .rt-thead .rt-resizable-header-content{
    font-weight:bold;
  }
  .ReactTable .rt-tbody .rt-td{
    align-self:center;
  }
`

class DatatableCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      staff: [],
      searchStaff: []
    }
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/staffs', {
      Authorization: `Bearer ${token}`
    })
    data.data = await data.data.map(staff => {
      return {
        ...staff,
        fb_name: staff.user.account_name,
        action: <Link href={{ pathname: '/wipper', query: { id: staff.user_id } }}><a><Button icon='search' color='blue' /></a></Link>
      }
    })
    this.setState({
      staff: data.data,
      searchStaff: data.data
    })
  }
  searchStaff = async (e) => {
    this.setState({ ...this.state, searchStaff: this.state.staff })
    let input = e.target.value
    let msg = input.toUpperCase()
    if (msg.length === 0) this.setState({ searchStaff: this.state.staff })
    else {
      let res = await this.state.searchStaff.filter(input => input.user_id.toString().toUpperCase().indexOf(msg) > -1 || input.student_id.toUpperCase().indexOf(msg) > -1 || input.fb_name.toUpperCase().indexOf(msg) > -1)
      await this.setState({...this.state, searchStaff: res})
    }
  }
  render () {
    const columns = [
      {
        Header: '#',
        accessor: 'user_id'
      },
      {
        Header: 'StudentID',
        accessor: 'student_id'
      },
      {
        Header: 'Facebook Name',
        accessor: 'user.account_name'
      },
      {
        Header: 'Action',
        accessor: 'action'
      }
    ]
    return (
      <div>
        <SearchInput onChange={this.searchStaff} type='text' icon='search' placeholder='Search...' />
        <StyledReactTable data={this.state.searchStaff} columns={columns} />
      </div>
    )
  }
}

export default DatatableCard
