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

class ApproveTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      res: [],
      search: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    let wipId = JSON.parse(window.localStorage.getItem('user')).id
    const questions = []
    let { token } = await getCookie({ req: false })
    const teams = JSON.parse(window.localStorage.getItem('team'))
    teams.map(team => {
      let data = axios.get(`/answers/${team.role}/${wipId}`, {
        Authorization: `Bearer ${token}`
      })
      data.then(async val => {
        val.data.map(async question => {
          questions.push(question)
        })
      })
    })
    this.setState({res: questions, search: questions, loading: false})
    console.log('search' + this.state.search)
  }

  searchCamper = async e => {
    this.setState({ ...this.state, search: this.state.res })
    let input = e.target.value
    let msg = input.toUpperCase()
    if (msg.length === 0) this.setState({ search: this.state.res })
    else {
      let res = await this.state.search.filter(
        input =>
          input.first_name.toUpperCase().indexOf(msg) > -1 ||
          input.last_name.toUpperCase().indexOf(msg) > -1 ||
          input.user_id.toString().indexOf(msg) > -1
      )
      await this.setState({ ...this.state, search: res })
    }
  }

  render () {
    return (
      <div className='text-center'>
        <SearchInput
          onChange={this.searchCamper}
          type='text'
          icon='search'
          placeholder='Search...'
        />
        {this.__renderTable()}
      </div>
    )
  }

  __renderTable () {
    const TableColumns = [
      {
        Header: '#',
        accessor: 'user_id',
        width: 100,
        style: { textAlign: 'center' }
      },
      {
        Header: 'FirstName',
        accessor: 'first_name',
        width: 200,
        filterMethod: (filter, row) => {
          row[filter.id].startsWith(filter.value) &&
            row[filter.id].endsWith(filter.value)
        }
      },
      { Header: 'LastName', width: 200, accessor: 'last_name' },
      {
        Header: '',
        width: 100,
        style: { textAlign: 'center' },
        Cell: props => (
          <div>
            <Link
              href={{
                pathname: '/itimanswer',
                query: { answer_id: props.original.id }
              }}
            >
              <a className='btn btn-primary'> See Answer</a>
            </Link>
          </div>
        )
      }
    ]

    return (
      <div>
        {this.state.loading
          ? <h1>loadin data</h1>
          : <ReactTable
            defaultPageSize={10}
            className='table'
            data={this.state.search}
            columns={TableColumns}
          />
        }
      </div>
    )
  }
}

export default ApproveTable
