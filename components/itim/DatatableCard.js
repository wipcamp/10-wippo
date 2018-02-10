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
      camper: [],
      searchCamper: []
    }
  }
  componentWillMount = async () => {
    let {data} = await Axios.get('http://localhost:8000/api/v1/profiles')
    data = data.map(profile => {
      return {
        ...profile,
        fullname: `${profile.first_name} ${profile.last_name}`,
        action: <Link href={{ pathname: '/itim', query: { id: profile.user_id } }}><a>ส่อง</a></Link>
      }
    })
    this.setState({
      camper: data,
      searchCamper: data
    })
  }
  searchCamper = async (e) => {
    this.setState({ ...this.state, searchCamper: this.state.camper })
    let input = e.target.value
    let msg = input.toUpperCase()
    if (msg.length === 0) this.setState({ searchCamper: this.state.camper })
    else {
      let res = await this.state.searchCamper.filter(input => input.first_name.toUpperCase().indexOf(msg) > -1 || input.last_name.toUpperCase().indexOf(msg) > -1 || input.nickname.toUpperCase().indexOf(msg) > -1)
      await this.setState({...this.state, searchCamper: res})
    }
  }
  render () {
    const columns = [
      {
        Header: '#',
        accessor: 'user_id'
      },
      {
        Header: 'Name - Surname',
        accessor: 'fullname'
      },
      {
        Header: 'Nickname',
        accessor: 'nickname'
      },
      {
        Header: 'Tel',
        accessor: 'telno'
      },
      {
        Header: 'Document',
        accessor: 'doc'
      },
      {
        Header: 'Action',
        accessor: 'action'
      }
    ]
    return (
      <div>
        <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />
        <StyledReactTable data={this.state.searchCamper} columns={columns} />
      </div>
    )
  }
}

export default DatatableCard
