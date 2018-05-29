import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.edit')

const SET_FIELD = issueAction('SET_FIELD')
const EDIT_ISSUE = issueAction('EDIT_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const INIT_EDIT = issueAction('INIT_EDIT')
const SET_SOLVE_STATUS = issueAction('SET_SOLVE_STATUS')
const GET_ASSIGNS = issueAction('GET_ASSIGNS', true)
const GET_ROLETEAMS = issueAction('GET_ROLETEAMS', true)
const GET_STAFFS = issueAction('GET_STAFFS', true)
const CHANGE_ASSIGN_FORM = issueAction('CHANGE_ASSIGN_FORM')
const EDIT_ASSIGN = issueAction('EDIT_ASSIGN', true)

let initialState = {
  id: 0,
  topic: '',
  desc: '',
  type: 0,
  priority: 0,
  isSolve: 0,
  notSolve: 0,
  assignTo: [],
  showModal: false,
  loading: false,
  staffs: [],
  roleteams: [],
  finish: false,
  changeform: false
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
        finish: false,
        changeform: false
      }

    case INIT_EDIT:
      return {
        ...state,
        ...action.data,
        showModal: true
      }

    case SET_SOLVE_STATUS:
      return {
        ...state,
        [action.field1]: action.value1,
        [action.field2]: action.value2
      }

    case EDIT_ISSUE.PENDING:
      return {
        ...state,
        loading: true
      }

    case EDIT_ISSUE.RESOLVED:
      return {
        ...state,
        loading: false,
        // showModal: false,
        finish: true
      }

    case EDIT_ISSUE.REJECTED:
      alert(`error: ${action.error}`)
      return {
        ...state,
        loading: false
      }

    case GET_ASSIGNS.PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_ASSIGNS.RESOLVED:
      return {
        ...state,
        loading: false,
        assignTo: action.data.filter(d => d.role_team_id !== null || d.assigned_id !== null)
      }

    case GET_ASSIGNS.REJECTED:
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
        roleteams: action.data.data.map((d, i) => ({...d, id: i + 1}))
      }

    case GET_ROLETEAMS.REJECTED:
      return {
        ...state,
        loading: false
      }

    case CHANGE_ASSIGN_FORM:
      return {
        ...state,
        changeform: true,
        assignTo: action.data
      }

    case EDIT_ASSIGN.PENDING:
      return {
        ...state,
        loading: true
      }

    case EDIT_ASSIGN.RESOLVED:
      alert('success')
      return {
        ...state,
        loading: false,
        showModal: false
      }

    case EDIT_ASSIGN.REJECTED:
      return {
        ...state,
        loading: false
      }
    default: return state
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

export const actions = {
  initEdit: (values) => ({
    type: INIT_EDIT,
    data: values
  }),
  editIssue: (e) => (dispatch, getStore) => {
    e.preventDefault()
    const { id, topic, desc, type, priority, isSolve, notSolve } = getStore().editIssue
    if (topic && desc && type && priority) {
      const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
      const data = {
        topic,
        description: desc,
        problem_type_id: type,
        priority_id: priority,
        is_solve: isSolve,
        not_solve: notSolve
      }
      dispatch({
        type: EDIT_ISSUE,
        promise: api.put(`/problems/${id}/wippo`, data, headers)
      })
    } else {
      dispatch({
        type: EDIT_ISSUE.REJECTED,
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
  changeSolveStatus: (value) => (dispatch) => {
    if (value === '1') { // isSolve = true
      dispatch({
        type: SET_SOLVE_STATUS,
        field1: 'isSolve',
        value1: 1,
        field2: 'notSolve',
        value2: 0
      })
    } else if (value === '2') { // notSolve = true
      dispatch({
        type: SET_SOLVE_STATUS,
        field1: 'isSolve',
        value1: 0,
        field2: 'notSolve',
        value2: 1
      })
    } else { // isSolve = false, notSolve = false
      dispatch({
        type: SET_SOLVE_STATUS,
        field1: 'isSolve',
        value1: 0,
        field2: 'notSolve',
        value2: 0
      })
    }
  },
  getAssigns: (problemid) => async (dispatch) => {
    const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
    dispatch({
      type: GET_ASSIGNS,
      promise: api.get(`assigns/problem_id/${problemid}`, headers)
    })
  },
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
  changeform: (data) => ({
    type: CHANGE_ASSIGN_FORM,
    data
  }),
  editAssign: () => (dispatch, getStore) => {
    const { id, assignTo } = getStore().editIssue
    const unique = assignTo.filter(onlyUnique)
    const data = unique.map(d => {
      return d.value.type === 'roleteam' ? (
        {
          problem_id: id,
          role_team_id: d.value.id
        }
      ) : (
        {
          problem_id: id,
          assigned_id: d.value.user_id
        }
      )
    })
    const headers = { Authorization: `Bearer ${cookie({req: false}).token}` }
    dispatch({
      type: EDIT_ASSIGN,
      promise: api.put(`assigns/problem_id/${id}`, { data }, headers)
    })
  }
}
