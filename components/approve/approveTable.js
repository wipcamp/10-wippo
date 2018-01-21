import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const myApi = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  crossDomain: true,
  xDomain: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const Badge = styled.span`
margin-right:4px;
`
class ApproveTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      res: [
        {'id': 1, 'name': 'farang', 'surname': 'emmel', 'document': [{'name': 'บฝ.', 'isApprove': 1}, {'name': 'ใบผู้ปกครอง', 'isApprove': 2}]},
        {'id': 2, 'name': 'bas', 'surname': 'tualek', 'document': [{'name': 'บฝ.', 'isApprove': 2}]}
      ]
    }
  }

  componentWillMount () {
    myApi.get('/approve').then(res => this.setState({res: res.data})).catch(reson => console.log(reson))
  }

  render () {
    return (
      <div>
        <table className='table table-hover'>
          <thead className='thead-ligth'>
            <tr>
              <th>#</th>
              <th>
                firstname
              </th>
              <th>
                lastname
              </th>
              <th>
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.res.map(data => (
              <tr>
                <th>{data.id}</th>
                <th>{data.name}</th>
                <th>{data.surname}</th>
                <th>{data.document.map(doc => {
                  if (doc.isApprove === 1) {
                    return (
                      <Badge className='badge badge-success'>
                        {doc.name}
                      </Badge>
                    )
                  } else if (doc.isApprove === 2) {
                    return (
                      <Badge className='badge badge-danger'>
                        {doc.name}
                      </Badge>
                    )
                  }
                })}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ApproveTable
