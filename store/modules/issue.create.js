import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.create')

const SET_FIELD = issueAction('SET_FIELD')
const CREATE_ISSUE = issueAction('CREATE_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLEAR_ALL_FIELD = issueAction('CLEAR_ALL_FIELD')

let initialState = {
  topic: '',
  desc: '',
  type: '',
  priority: '',
  isSolve: '',
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
        priority: '',
        isSolve: ''
      }

    default: return state
  }
}

export const actions = {
  createIssue: (values) => (dispatch, getStore) => {
    dispatch({
      type: CREATE_ISSUE
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
  clearAll: () => ({
    type: CLEAR_ALL_FIELD
  })
}
