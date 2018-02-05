import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from 'axios'

const Badge = styled.span.attrs({
  className: ({isApprove}) => isApprove === 1 ? `badge badge-danger` : `badge badge-warning`
})`
  margin-right:4px;
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
          {props.value.map(data => (
            <Badge isApprove={data.is_approve !== null ? 'null' : data.is_approve}>
              {data.is_approve}
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
