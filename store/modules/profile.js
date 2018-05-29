/* global localStorage */
import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'
import { convertToInt, dataIsNotNull } from '../../utils/helper'

const regisAction = actionCreator('profile')

const SET_FIELD = regisAction('SET_FIELD')
const SAVE_PROFILE = regisAction('SAVE_PROFILE', true)
const SHOW_DIALOG = regisAction('SHOW_DIALOG')
const HIDE_DIALOG = regisAction('HIDE_DIALOG')

let initialState = {
  loading: false,
  showDialog: false,
  error: false,
  dialogMessage: '',
  step: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return action.payload ? {
        ...state,
        dialogMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้องนะครับ',
        error: true,
        showDialog: true
      } : { ...state }

    case HIDE_DIALOG:
      return {
        ...state,
        showDialog: false
      }

    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }

    case SAVE_PROFILE.PENDING:
      return {
        ...state,
        loading: true
      }

    case SAVE_PROFILE.RESOLVED:
      return {
        ...state,
        loading: false,
        step: state.step + 1
      }

    case SAVE_PROFILE.REJECTED:
      return {
        ...state,
        loading: false,
        dialogMessage: action.error,
        showDialog: true,
        error: true
      }

    default: return state
  }
}

const prepareData = (form, fields) => {
  const data = {}
  fields.map(field => { data[field] = form[field] })
  return data
}

const getOnlyNum = (value) => value.replace(/[^\d]/g, '')

const fields = [
  'user_id',
  'first_name',
  'last_name',
  'first_name_en',
  'last_name_en',
  'nickname',
  'gender_id',
  'citizen_id',
  'religion_id',
  'birth_at',
  'blood_group',
  'congenital_diseases',
  'allergic_foods',
  'congenital_drugs',

  'addr_prov',
  'addr_dist',
  'telno_personal',

  'edu_name',
  'edu_lv',
  'edu_major',
  'edu_gpax',
  'parent_relation',
  'parent_relation',
  'telno_parent',

  'birth_at'
]

export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  profileSubmit: (values) => async (dispatch) => {
    const data = prepareData(values, fields)
    data.gender_id = convertToInt(data.gender_id)
    data.religion_id = convertToInt(data.religion_id)
    if (data.birth_at) {
      data.birth_at = data.birth_at.format('YYYY-MM-DD')
    }
    data.telno_personal = getOnlyNum(data.telno_personal)
    data.citizen_id = getOnlyNum(data.citizen_id)
    data.user_id = await JSON.parse(localStorage.getItem('user')).id
    console.log(data)

    let { token } = cookie({req: false})
    if (dataIsNotNull(data)) {
      dispatch({
        type: SAVE_PROFILE,
        promise: api.put(`/profiles/${data.user_id}`, data, {Authorization: `Bearer ${token}`})
      })
    } else {
      dispatch({
        type: SAVE_PROFILE.REJECTED
      })
    }
  },
  onSubmitError: (err) => ({
    type: SHOW_DIALOG,
    payload: err
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  })
}
