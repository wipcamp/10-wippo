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
    let { token } = getCookie({ req: false })
    const teams = JSON.parse(window.localStorage.getItem('team'))
    let answers = teams.map(async team => {
      let {data} = await axios.get(`/answers/${team.role}/${wipId}`, {
        Authorization: `Bearer ${token}`
      })
      return data
    })
    await Promise.all(answers).then(arrs => {
      arrs.map(arr => {
        arr.map(async answer => {
          console.log(answer)
          await this.setState({res: [...this.state.res, answer]})
          await this.setState({search: [...this.state.search, answer]})
        })
      })
    })
    console.log('res', this.state.res)
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
    const TableColumns = [
      {
        Header: '#',
        accessor: 'user_id',
        width: 100,
        style: { textAlign: 'center' }
      },
      {
        Header: 'Nick Name',
        accessor: 'nickname',
        width: 200,
        filterMethod: (filter, row) => {
          row[filter.id].startsWith(filter.value) &&
            row[filter.id].endsWith(filter.value)
        }
      },
      { Header: 'Question Id', width: 200, accessor: 'question_id' },
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
      <div className='text-center'>
        <SearchInput
          onChange={this.searchCamper}
          type='text'
          icon='search'
          placeholder='Search...'
        />
        <div>
          <ReactTable
            defaultPageSize={10}
            className='table'
            data={this.state.search}
            columns={TableColumns}
          />
        </div>
      </div>
    )
  }
}

export default ApproveTable
