import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.create')

const SET_FIELD = issueAction('SET_FIELD')
const CREATE_ISSUE = issueAction('CREATE_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLEAR_ALL_FIELD = issueAction('CLEAR_ALL_FIELD')

let initialState = {
  loading: false,
  topic: '',
  desc: '',
  type: '',
  priority: '',
  assignTo: [],
  showModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }

    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      }

    case CLEAR_ALL_FIELD:
      return {
        ...state,
        topic: '',
        desc: '',
        type: '',
        priority: ''
      }

    case CREATE_ISSUE.PENDING:
      return {
        ...state,
        loading: true
      }

    case CREATE_ISSUE.RESOLVED:
      alert('success')
      return {
        ...state,
        loading: false,
        showModal: false,
        topic: '',
        desc: '',
        type: '',
        priority: ''
        // action.data
      }

    case CREATE_ISSUE.REJECTED:
      alert('error: ' + action.error)
      return {
        ...state,
        loading: false
      }

    default: return state
  }
}

const mapFields = (fields, values) => {
  const data = {}
  fields.map(field => {
    data[field] = values[field]
  })
  return data
}

export const actions = {
  createIssue: (e) => (dispatch, getStore) => {
    e.preventDefault()
    const { topic, desc, type, priority } = getStore().createIssue
    if (topic && desc && type && priority) {
      const { id } = JSON.parse(window.localStorage.getItem('user'))
      const fields = [
        'topic',
        'description',
        'priority_id',
        'report_id',
        'problem_type_id'
      ]
      const values = {
        topic,
        description: desc,
        problem_type_id: type,
        priority_id: priority,
        report_id: id
      }
      const data = mapFields(fields, values)
      const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
      dispatch({
        type: CREATE_ISSUE,
        promise: api.post('/problems', data, headers)
      })
    } else {
      dispatch({
        type: CREATE_ISSUE.REJECTED,
        error: 'ข้อมูลใส่ไม่ครบ'
      })
    }
  },
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  toggleModal: () => ({
    type: TOGGLE_MODAL
  }),
  clearAll: () => ({
    type: CLEAR_ALL_FIELD
  })
}
