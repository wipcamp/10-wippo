import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Input } from 'semantic-ui-react'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'

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
    let data = []
    let wipId = JSON.parse(window.localStorage.getItem('user')).id
    let { token } = getCookie({ req: false })
    let temps = []
    const teams = JSON.parse(window.localStorage.getItem('team'))
    let answers = teams.map(async team => {
      let {data} = await axios.get(`/answers/${team.role}/${wipId}`, {
        Authorization: `Bearer ${token}`
      })
      return data
    })
    await Promise.all(answers).then(arrs => {
      arrs.map(async arr => {
        await arr.map(async answer => {
          data.push(answer)
        })
      })
    })
    temps = data.map((answer) => {
      return {
        question_id: answer.question_id,
        answer_id: answer.answer_id,
        created_at: answer.created_at,
        nickname: answer.nickname,
        updated_at: answer.updated_at,
        user_id: answer.user_id,
        criteriea: data.filter(map => {
          if (map.answer_id === answer.answer_id) {
            return {
              id: map.id,
              name: map.name,
              percentatge: map.percentatge
            }
          }
        })
      }
    })
    data = await temps.filter((i, index) => {
      if (index % temps[0].criteriea.length === 0) {
        return i
      }
    })
    this.setState({
      search: data,
      res: data
    })
    console.log('state', this.state.res)
  }

  searchCamper = async e => {
    console.log(this.state.search)
    let input = e.target.value
    let msg = input.toUpperCase()
    if (msg.length === 0) this.setState({ search: this.state.res })
    else {
      let res = await this.state.search.filter(
        input =>
          input.nickname.toUpperCase().indexOf(msg) > -1 ||
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
      {
        Header: 'Score',
        width: 600,
        style: { textAlign: 'center' },
        Cell: props => {
          let criterieas = []
          props.original !== undefined ? criterieas = props.original : criterieas = [{criteriea: []}]
          return (
            <div>
              {criterieas.criteriea.map((score, i) => (
                <span key={i} style={{marginRight: '20px'}}>{score.name} : {score.score === null ? '-' : score.score}</span>
              ))}
            </div>
          )
        }
      }, {
        Header: '',
        width: 100,
        style: { textAlign: 'center' },
        Cell: props => (
          <div>
            <Link
              href={{
                pathname: '/itimanswer',
                query: {
                  id: props.original.user_id,
                  name: props.original.nickname,
                  answer: props.original.answer_id
                }
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
            noDataText={
              <PulseLoader
                color={'rgb(58, 165, 212)'}
                loading={this.state.loading}
              />
            }
            data={this.state.search}
            columns={TableColumns}
          />
        </div>
      </div>
    )
  }
}

export default ApproveTable
