import React from 'react'
import Layout from '../../components/layout/layout'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>Examination</li>
  </ol>
)

export default class Examination extends React.Component {
  state = {
    exams: []
  }
  constructor (props) {
    super(props)
    this.handleAnsChange = this.handleAnsChange.bind(this)
    this.handleCorrectChange = this.handleCorrectChange.bind(this)
    this.handleSaveQuestion = this.handleSaveQuestion.bind(this)
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount = async () => {
    // let {token} = await getCookie({req: false})
    // let headers = {
    //   Authorization: `Bearer ${token}`
    // }
    // let data = await axios.get('/exams', headers)
    // this.setState({
    //   exams: data.data
    // })
    this.setState({
      exams: [
        {
          id: 1,
          score: 100,
          data: 'เต้หล่อมั้ย',
          created_at: '2018-05-20 15:58:02',
          updated_at: '2018-05-20 15:58:02',
          exam_choices: [
            {
              id: 1,
              question_id: 1,
              data: 'หล่อ',
              is_corrected: 0,
              created_at: '2018-05-20 15:58:02',
              updated_at: '2018-05-20 15:58:02'
            },
            {
              id: 2,
              question_id: 1,
              data: 'หล่อจ้า',
              is_corrected: 0,
              created_at: '2018-05-20 15:58:02',
              updated_at: '2018-05-20 15:58:02'
            },
            {
              id: 3,
              question_id: 1,
              data: 'หล่อมาก',
              is_corrected: 1,
              created_at: '2018-05-20 15:58:02',
              updated_at: '2018-05-20 15:58:02'
            },
            {
              id: 4,
              question_id: 1,
              data: 'หล่อน้อย',
              is_corrected: 0,
              created_at: '2018-05-20 15:58:02',
              updated_at: '2018-05-20 15:58:02'
            }
          ]
        }
      ]
    })
    let exams = this.state.exams
    exams.forEach(ele => {
    })
  }

  handleAnsChange (event) {
    let answerId = event.target.id
    let exams = this.state.exams
    exams.forEach((question, qIndex) => {
      question.exam_choices.forEach((choice, cIndex) => {
        if (choice.id === answerId - 0) {
          choice.data = event.target.value
        }
      })
    })
    this.setState({
      exams
    })
  }

  handleCorrectChange (event) {
    let answerId = event.target.id
    let exams = this.state.exams
    exams.forEach((question, qIndex) => {
      question.exam_choices.forEach((choice, cIndex) => {
        choice.is_corrected = 0
        if (choice.id === answerId - 0) {
          choice.is_corrected = 1
        }
      })
    })
    this.setState({
      exams
    })
  }

  handleSaveQuestion (event) {
    const questionId = event.target.id
  }

  handleDeleteQuestion (event) {
    const questionId = event.target.id
  }

  handleDeleteAnswer (event) {
    const answerId = event.target.id
  }

  handleCancel (event) {
    const questionId = event.target.id
  }

  handleEdit (event) {
    const questionId = event.target.id
  }

  render () {
    console.log('exam', this.state.exams)
    return (
      <div>
        <Layout subheadertext={<Breadcrumb />}>
          <div className='row'>
            <div className='col-12'>
              <table className='table'>
                <tr>
                  <td>ข้อ</td>
                  <td>คำถาม</td>
                  <td>แก้ไข</td>
                  <td>ลบ</td>
                </tr>
                {this.state.exams.length === 0 ? 'No question yet.'
                  : this.state.exams.map((element, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <input className='form-control' value={element.data} disabled={true} />
                          <table className='table table-sm mt-2'>
                            <tr className='table-info'>
                              <td>ข้อถูก</td>
                              <td>ตัวเลือก</td>
                              <td>ลบ</td>
                            </tr>
                            {element.exam_choices.map((ans, index) => {
                              return <tr>
                                <td>
                                  <input type='radio' name={ans.question_id} id={ans.id} checked={ans.is_corrected === 1} value={ans.is_corrected === 1 ? 1 : 0} onChange={this.handleCorrectChange} />
                                </td>
                                <td>
                                  <input className='form-control form-control-sm' value={ans.data} id={ans.id} onChange={this.handleAnsChange} />
                                </td>
                                <td>
                                  <button className='btn btn-danger' id={ans.id} onClick={this.handleDeleteAnswer}>-</button>
                                </td>
                              </tr>
                            })}
                            <tr>
                              <td>
                                <button id={element.id} className='btn btn-primary' onClick={this.handleSaveQuestion}>บันทึก</button>
                                <button id={element.id} className='btn btn' onClick={this.handleCancel}>ยกเลิกการเปลี่ยนแปลง</button>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>
                          <button id={element.id} className='btn' onClick={this.handleEdit}>/</button>
                        </td>
                        <td>
                          <button id={element.id} className='btn btn-danger' onClick={this.handleDeleteQuestion}>-</button>
                        </td>
                      </tr>
                    )
                  })
                }
                <tr>
                  <td />
                  <td>
                    <input type='text' className='form-control' />
                  </td>
                  <td>
                    <button className='btn'>+</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}
