import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.create')

const SET_FIELD = issueAction('SET_FIELD')
const CREATE_ISSUE = issueAction('CREATE_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLEAR_ALL_FIELD = issueAction('CLEAR_ALL_FIELD')
const GET_ROLETEAMS = issueAction('GET_ROLETEAMS', true)
const GET_STAFFS = issueAction('GET_STAFFS', true)
const INSERT_ASSIGN = issueAction('INSERT_ASSIGN', true)

let initialState = {
  loading: false,
  id: 0,
  topic: '',
  desc: '',
  type: '',
  priority: '',
  assignTo: [],
  showModal: false,
  roleteams: [],
  staffs: [],
  finish: false
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
        showModal: !state.showModal,
        finish: false
      }

    case CLEAR_ALL_FIELD:
      return {
        ...state,
        topic: '',
        desc: '',
        type: '',
        priority: '',
        assignTo: []
      }

    case CREATE_ISSUE.PENDING:
      return {
        ...state,
        loading: true
      }

    case CREATE_ISSUE.RESOLVED:
      return {
        ...state,
        loading: false,
        finish: true,
        id: action.data
        // action.data
      }

    case CREATE_ISSUE.REJECTED:
      // alert('error: ' + action.error)
      return {
        ...state,
        loading: false
      }

    case GET_STAFFS.PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_STAFFS.RESOLVED:
      return {
        ...state,
        loading: false,
        staffs: action.data.data,
        finish: false
      }

    case GET_STAFFS.REJECTED:
      return {
        ...state,
        loading: false
      }

    case GET_ROLETEAMS.PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_ROLETEAMS.RESOLVED:
      return {
        ...state,
        loading: false,
        roleteams: action.data.data
      }

    case GET_ROLETEAMS.REJECTED:
      return {
        ...state,
        loading: false
      }

    case INSERT_ASSIGN.PENDING:
      return {
        ...state,
        loading: true
      }

    case INSERT_ASSIGN.RESOLVED:
      return {
        ...state,
        loading: false,
        showModal: false,
        topic: '',
        desc: '',
        type: '',
        priority: '',
        assignTo: []
      }

    case INSERT_ASSIGN.REJECTED:
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
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
  }),
  getRoleTeams: () => (dispatch) => {
    const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
    dispatch({
      type: GET_ROLETEAMS,
      promise: api.get('/roleteams', headers)
    })
  },
  getStaffs: () => (dispatch) => {
    const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
    dispatch({
      type: GET_STAFFS,
      promise: api.get('/staffs', headers)
    })
  },
  insertAssign: () => (dispatch, getStore) => {
    const createIssue = getStore().createIssue
    if (createIssue.assignTo.length === 0) {
      dispatch({
        type: INSERT_ASSIGN.RESOLVED
      })
    } else {
      const unique = createIssue.assignTo.filter(onlyUnique)
      const data = unique.map(d => {
        return d.value.type === 'roleteam' ? (
          {
            problem_id: createIssue.id,
            role_team_id: d.value.id
          }
        ) : (
          {
            problem_id: createIssue.id,
            assigned_id: d.value.user_id
          }
        )
      })
      const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
      dispatch({
        type: INSERT_ASSIGN,
        promise: api.post('/assigns', { data }, headers)
      })
    }
  }
}
