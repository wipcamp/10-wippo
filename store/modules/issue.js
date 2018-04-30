import moment from 'moment'

import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'

const issueAction = actionCreator('issue')

const SET_FIELD = issueAction('SET_FIELD')
const GET_PROBLEM = issueAction('GET_PROBLEM', true)
const INIT_DATE = issueAction('INIT_DATE')

let initialState = {
  loading: false,
  issueList: [],
  text: '',
  date: ' - ',
  error: {},
  data: {}
}

const getDay = (dd) => {
  if (dd === '30') return 'Day 1 '
  if (dd === '31') return 'Day 2 '
  if (dd === '1') return 'Day 3 '
  if (dd === '2') return 'Day 4 '
  if (dd === '2') return 'Day 5 '
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

    case INIT_DATE:
      const now = moment()
      if (now.isBetween('2018-5-30', '2018-6-3')) {
        let d = getDay(now.format('DD'))
        return {
          ...state,
          date: d + now.format(' (DD MMM YYYY)')
        }
      } else if (now.isAfter('2018-6-3')) {
        return {
          ...state,
          date: 'Day 5 (3 Jun 2018)'
        }
      }
      return {
        ...state
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
  }),
  initDate: () => ({
    type: INIT_DATE
  })
}
