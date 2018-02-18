import React from 'react'
import ReactTable from 'react-table'
import styled, { injectGlobal } from 'styled-components'
import Axios from 'axios'
import Link from 'next/link'
import { Input } from 'semantic-ui-react'

const StyledReactTable = styled(ReactTable)`
  text-align:center;
`
const SearchInput = styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`
injectGlobal`
  .ReactTable .rt-thead .rt-resizable-header-content{
    font-weight:bold;
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
  componentWillMount = async () => {
    // let {data} = await Axios.get('http://localhost:8000/api/v1/staffs')
    let {data} = await Axios.get('https://api.freezer.wip.camp/api/v1/staffs')
    console.log(data)
    data.data = await data.data.map(staff => {
      return {
        ...staff,
        action: <Link href={{ pathname: '/wipper', query: { id: staff.user_id } }}><a>ส่อง</a></Link>
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
      let res = await this.state.searchStaff.filter(input => input.first_name.toUpperCase().indexOf(msg) > -1 || input.last_name.toUpperCase().indexOf(msg) > -1 || input.nickname.toUpperCase().indexOf(msg) > -1)
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
