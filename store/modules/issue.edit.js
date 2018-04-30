import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue.edit')

const SET_FIELD = issueAction('SET_FIELD')
const EDIT_ISSUE = issueAction('EDIT_ISSUE', true)
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const INIT_EDIT = issueAction('INIT_EDIT')

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

    case INIT_EDIT:
      return {
        ...state,
        ...action.data,
        showModal: true
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
  })
}
