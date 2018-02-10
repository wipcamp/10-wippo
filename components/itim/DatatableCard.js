import React from 'react'
import ReactTable from 'react-table'
import styled from 'styled-components'
import Axios from 'axios'
import Link from 'next/link'

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
      this.setState({searchCamper: this.state.camper})
      let res = await this.state.searchCamper.filter(input => input.first_name.indexOf(msg) > -1 || input.last_name.indexOf(msg) > -1 || input.nickname.indexOf(msg) > -1)
      this.setState({...this.state, searchCamper: res})
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
        Header: 'Action',
        accessor: 'action'
      }
    ]
    return (
      <div>
        <input onChange={this.searchCamper} type='text' />
        <ReactTable filterable data={this.state.searchCamper} columns={columns} />
      </div>
    )
  }
}

export default DatatableCard
