import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.detail')

const SET_FIELD = issueAction('SET_FIELD')
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLOSE_MODAL = issueAction('CLOSE_MODAL')
const VIEW_DETAIL = issueAction('VIEW_DETAIL')
const GET_ASSIGNS = issueAction('GET_ASSIGNS', true)
const GET_ROLETEAMS = issueAction('GET_ROLETEAMS', true)
const GET_STAFFS = issueAction('GET_STAFFS', true)

let initialState = {
  loading: false,
  id: 0,
  topic: '',
  desc: '',
  type: 0,
  priority: 0,
  isSolve: 0,
  notSolve: 0,
  time: '',
  reportId: 0,
  assignTo: [],
  showModal: false,
  staffs: [],
  roleteams: []
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

    case VIEW_DETAIL:
      return {
        ...state,
        ...action.data,
        showModal: true
      }

    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false
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

    default: return state
  }
}

export const actions = {
  toggleModal: () => ({
    type: TOGGLE_MODAL
  }),
  viewDetail: (values) => ({
    type: VIEW_DETAIL,
    data: {
      id: values.id,
      topic: values.topic,
      desc: values.description,
      type: values.problem_type_id,
      priority: values.priority_id,
      isSolve: values.is_solve,
      notSolve: values.not_solve,
      time: values.created_at,
      reportId: values.report_id
    }
  }),
  closeModal: () => ({
    type: CLOSE_MODAL
  }),
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
  }
}
