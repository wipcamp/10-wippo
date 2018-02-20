import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from '../util/axios'
import getCookie from '../util/cookie'
import { Label, Button, Icon } from 'semantic-ui-react'

const Badge = styled(Label)`
  overflow: hidden;
  text-overflow: ellipsis; 
  width: 12em;
`

class ApproveTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      res: []
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
    this.setState({res: result})
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
      <tableColumns>
        <div>
          <ReactTable defaultPageSize={10} className='table' data={this.state.res} columns={tableColumns} />
        </div>
      </tableColumns>
    )
  }
}

export default ApproveTable
