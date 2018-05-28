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
      page: 0,
      loading: true
    }
    this.incresePage = this.incresePage.bind(this)
    this.decresePage = this.decresePage.bind(this)
    this.setPage = this.setPage.bind(this)
    this.savePage = this.savePage.bind(this)
  }

  componentDidMount = async () => {
    let { token } = getCookie({ req: false })
    let wipId = JSON.parse(window.localStorage.getItem('user')).id
    const teams = JSON.parse(window.localStorage.getItem('team'))
    let {data} = await axios.get(`/answers/success`, {
      Authorization: `Bearer ${token}`
    })
    let search = await data.filter((data) => {
      return data.question_id === teams[0].role
    })
    this.setState({
      search
    })
    // let answers = teams.map(async team => {
    //   console.log('fetch  ', data)
    //   return data
    // })
    // await Promise.all(answers).then(arrs => {
    //   arrs.map(async arr => {
    //     await arr.map(async answer => {
    //       data.push(answer)
    //     })
    //   })
    // })
    // temps = data.map((answer) => {
    //   return {
    //     question_id: answer.question_id,
    //     answer_id: answer.answer_id,
    //     created_at: answer.created_at,
    //     nickname: answer.nickname,
    //     updated_at: answer.updated_at,
    //     user_id: answer.user_id,
    //     criteriea: data.filter(map => {
    //       if (map.answer_id === answer.answer_id) {
    //         return {
    //           id: map.id,
    //           name: map.name,
    //           percentatge: map.percentatge
    //         }
    //       }
    //     })
    //   }
    // })
    // data = await temps.filter((i, index) => {
    //   if (index % temps[0].criteriea.length === 0) {
    //     return i
    //   }
    // })
    // this.setState({
    //   search: data,
    //   res: data
    // })
    // await console.log('state', this.state.res)
    // await console.log('data', data)
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

  setPage (e) {
    this.setState({page: e.target.value - 1})
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

  savePage () {
    window.localStorage.setItem('currentPage', this.state.page)
  }

  render () {
    const Button = styled.button`
    padding-left:8px;
    margin-right: 8px;
    width: 30px;
  `

    const Pageignation = () => (
      <div className='input-group' >
        <Button className='btn btn-info form-control' onClick={this.decresePage}>Previous</Button>
        <input className='form-control' value={this.state.page + 1} style={{marginRight: '8px'}} onChange={this.setPage} type='number' min='1' />
        <Button className='btn btn-info form-control' onClick={this.incresePage}>Next</Button>
      </div>
    )

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
      // {
      //   Header: 'Score',
      //   width: 600,
      //   style: { textAlign: 'center' },
      //   Cell: props => {
      //     let criterieas = []
      //     props.original !== undefined ? criterieas = props.original : criterieas = [{criteriea: []}]
      //     return (
      //       <div>
      //         {criterieas.criteriea.map((score, i) => {
      //           console.log(criterieas.criteriea.length)
      //           if (criterieas.criteriea.length === 4) {
      //             if (i < 3) {
      //               if (i !== 0) {
      //                 if (criterieas.criteriea[i - 1].name !== score.name &&
      //                   criterieas.criteriea[i - 1].id !== score.id) {
      //                   return (
      //                     <span key={i} style={{marginRight: '20px'}}>{score.name} : {score.score === null ? '-' : score.score}</span>
      //                   )
      //                 }
      //               } else if (i === 0) {
      //                 return (
      //                   <span key={i} style={{marginRight: '20px'}}>{score.name} : {score.score === null ? '-' : score.score}</span>
      //                 )
      //               }
      //             }
      //           } else if (criterieas.criteriea.length === 9) {
      //             if (i === 0 || i === 3 || i === 6) {
      //               return (
      //                 <span key={i} style={{marginRight: '20px'}}>{score.name} : {score.score === null ? '-' : score.score}</span>
      //               )
      //             }
      //           }
      //           return (<span key={i} />)
      //         })}
      //       </div>
      //     )
      //   }
      // },
      {
        Header: '',
        width: 100,
        style: { textAlign: 'center' },
        Cell: props => (
          <div>
            {console.log(props)}
            <Link
              href={{
                pathname: '/itimanswer',
                query: {
                  id: props.original.user_id,
                  name: props.original.nickname,
                  answer: props.original.id
                }
              }}
            >
              <a target='_blank' className='btn btn-primary'>See Answer</a>
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
            page={this.state.page}
            PaginationComponent={Pageignation}
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
