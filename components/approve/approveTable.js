import React from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import axios from 'axios'
// const myApi = axios.create({
//   baseURL: 'http://localhost:8000/api/v1',
//   timeout: 10000,
//   crossDomain: true,
//   xDomain: true,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// })

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
    // myApi.get('/approve').then(res => this.setState({data: res.data}))
    let result = await axios.get('http://127.0.0.1:8000/api/v1/approve')
    this.setState({res: result.data.array})
  }

  render () {
    const tableColumns = [
      {Header: '#', accessor: 'id', width: 45, style: {textAlign: 'center'}},
      {Header: 'FirstName', accessor: 'name'},
      {Header: 'lasname', accessor: 'surname'},
      {Header: 'Document',
        accessor: 'document',
        style: {textAlign: 'center'},
        Cell: props => <div>
          {props.original.document.map(data => (
            <Badge isApprove={data.isApprove}>
              {data.name}
              {console.log(data.isApprove)}
            </Badge>
          ))}
        </div>
      }
    ]
    return (
      <div>
        <ReactTable className='table' data={this.state.res} columns={tableColumns} />
        {console.log(this.state.res)}
      </div>
    )
  }
}

export default ApproveTable
