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
    default: return state
  }
}

export const actions = {
  initEdit: (values) => ({
    type: INIT_EDIT,
    data: values
  }),
  editIssue: (values) => (dispatch, getStore) => {
    dispatch({
      type: EDIT_ISSUE
    })
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
