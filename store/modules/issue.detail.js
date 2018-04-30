import actionCreator from '../../libs/actionCreator'

const issueAction = actionCreator('issue.detail')

const SET_FIELD = issueAction('SET_FIELD')
const TOGGLE_MODAL = issueAction('TOGGLE_MODAL')
const CLOSE_MODAL = issueAction('CLOSE_MODAL')
const VIEW_DETAIL = issueAction('VIEW_DETAIL')

let initialState = {
  id: '',
  topic: '',
  desc: '',
  type: '',
  priority: '',
  isSolve: '',
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
      const { isSolve } = action.data
      let solve = isSolve ? '1' : '0'
      return {
        ...state,
        showModal: true,
        id: action.data.id,
        topic: action.data.topic,
        desc: action.data.desc,
        type: action.data.type,
        priority: action.data.priority,
        isSolve: solve,
        time: action.data.time
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
      isSolve: values.is_solve || values.not_solve,
      time: values.created_at
    }
  }),
  closeModal: () => ({
    type: CLOSE_MODAL
  })
}
