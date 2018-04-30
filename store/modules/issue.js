import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue')

const SET_FIELD = issueAction('SET_FIELD')
const GET_PROBLEM = issueAction('GET_PROBLEM', true)

let initialState = {
  loading: false,
  issueList: [],
  text: '',
  date: '30 May 2018',
  error: {},
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROBLEM.PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_PROBLEM.RESOLVED:
      return {
        ...state,
        loading: false,
        issueList: action.data.reverse()
      }

    case GET_PROBLEM.REJECTED:
      return {
        ...state,
        loading: false,
        err: 'Cant Connection API'
      }

    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }

    default: return state
  }
}

export const actions = {
  getIssue: () => {
    const headers = {
      Authorization: `Bearer ${cookie({req: false}).token}`
    }
    return {
      type: GET_PROBLEM,
      promise: api.get('/problems', headers)
    }
  },
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  })
}
