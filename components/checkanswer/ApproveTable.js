import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Input } from 'semantic-ui-react'
import Link from 'next/link'

const SearchInput = styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`

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
      search: []
    }
  }

  componentWillMount = async () => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get('/dashboard/register/success', {
      Authorization: `Bearer ${token}`
    })
    console.log('data', data)
    this.setState({res: data, search: data})
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
      {Header: '',
        width: 150,
        style: {textAlign: 'center'},
        Cell: props => <div>
          <Link href={{ pathname: '/itimanswer', query: { user_id: props.original.user_id } }}>
            <a className='btn btn-primary' > See Answer</a>
          </Link>
        </div>
      }
    ]
    return (
      <div className='text-center'>
        <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />
        <div>
          <ReactTable defaultPageSize={10} className='table' data={this.state.search} columns={TableColumns} />
        </div>
      </div>
    )
  }
}

export default ApproveTable
