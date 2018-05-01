import actionCreator from '../../libs/actionCreator'

const issueAction = actionCreator('issue.detail')

const SET_FIELD = issueAction('SET_FIELD')
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLOSE_MODAL = issueAction('CLOSE_MODAL')
const VIEW_DETAIL = issueAction('VIEW_DETAIL')

let initialState = {
  id: 0,
  topic: '',
  desc: '',
  type: 0,
  priority: 0,
  isSolve: 0,
  notSolve: 0,
  time: '',
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
      time: values.created_at
    }
  }),
  closeModal: () => ({
    type: CLOSE_MODAL
  })
}
