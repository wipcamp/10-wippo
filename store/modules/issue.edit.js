import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.edit')

const SET_FIELD = issueAction('SET_FIELD')
const EDIT_ISSUE = issueAction('EDIT_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const INIT_EDIT = issueAction('INIT_EDIT')
const SET_SOLVE_STATUS = issueAction('SET_SOLVE_STATUS')

let initialState = {
  topic: '',
  desc: '',
  type: 0,
  priority: 0,
  isSolve: 0,
  notSolve: 0,
  assignTo: [],
  showModal: false,
  loading: false
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
      alert('edit success')
      return {
        ...state,
        loading: false,
        showModal: false
      }

    case EDIT_ISSUE.REJECTED:
      alert(`error: ${action.error}`)
      return {
        ...state,
        loading: false
      }

    default: return state
  }
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
  }
}
