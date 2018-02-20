import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Label, Button, Icon, Input } from 'semantic-ui-react'

const Badge = styled(Label)`
  overflow: hidden;
  text-overflow: ellipsis; 
  width: 12em;
`
const SearchInput = styled(Input)`
  width:100%;
  margin-bottom:1.2em;
`
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
    let {data} = await axios.get('/approve', {
      Authorization: `Bearer ${token}`
    })
    let result = data.map((profile) => ({
      ...profile,
      documents: profile.documents.filter((doc) => doc.type_id !== 1)
    }))
    result = result.filter(profile => profile.documents.length)
    console.log(result)
    this.setState({res: result, search: result})
  }

  checkDocStatus = (status) => {
    switch (status) {
      case 0:
        return 'red'
      case 1:
        return 'green'
      default:
        return 'yellow'
    }
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
    let doc = []
    const tableColumns = [
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
      {Header: 'Document',
        accessor: 'documents',
        style: {textAlign: 'center'},
        Cell: props => {
          props.value.map(data => {
            doc[data.type_id - 1] = data
          })
          return (
            <div>
              {doc.map((data, i) => data ? <Badge key={i} color={this.checkDocStatus(data.is_approve)}>
                {data.document_type.display_name}
              </Badge> : <span />)
              }
            </div>
          )
        }
      },
      {Header: '',
        width: 150,
        style: {textAlign: 'center'},
        Cell: props => <div>
          <Button onClick={() => Router.push({
            pathname: '/verify',
            query: { user_id: props.original.user_id }
          })} icon color='blue' >
            <Icon name='search' />
            approve
          </Button>
        </div>
      }
    ]
    return (
      <div>
        <SearchInput onChange={this.searchCamper} type='text' icon='search' placeholder='Search...' />  
        <tableColumns>
          <div>
            <ReactTable defaultPageSize={10} className='table' data={this.state.search} columns={tableColumns} />
          </div>
        </tableColumns>
      </div>
    )
  }
}

export default ApproveTable
