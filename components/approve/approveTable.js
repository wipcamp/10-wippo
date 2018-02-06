import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from 'axios'
import { Label } from 'semantic-ui-react'

const Badge = styled(Label)`
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
    let result = await axios.get('http://127.0.0.1:8000/api/v1/approve')
    this.setState({res: result.data})
  }

  render () {
    const tableColumns = [
      {Header: '#', accessor: 'user_id', width: 45, style: {textAlign: 'center'}},
      {Header: 'FirstName',
        accessor: 'first_name',
        filterMethod: (filter, row) => {
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value)
        }
      },
      {Header: 'lasname', accessor: 'last_name'},
      {Header: 'Document',
        accessor: 'documents',
        style: {textAlign: 'center'},
        Cell: props => <div>
          {console.log(props)}
          {props.value.map(data => (
            <Badge color={data.is_approve !== null ? 'red' : 'green'}>
              {data.document_type.display_name}
            </Badge>
          ))}
        </div>
      }
    ]
    return (
      <tableColumns>
        <div>
          <ReactTable defaultPageSize={10} className='table' data={this.state.res} columns={tableColumns} />
          {/* {console.log(this.state.res)} */}
        </div>
      </tableColumns>
    )
  }
}

export default ApproveTable
