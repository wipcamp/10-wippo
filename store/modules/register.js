/* global localStorage */
import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'
import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'

const regisAction = actionCreator('register')

const SET_FIELD = regisAction('SET_FIELD')
const SAVE_REGISTER = regisAction('SAVE_REGISTER')
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
      return action.payload && {
        ...state,
        dialogMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้องนะครับ',
        error: true,
        showDialog: true
      }

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

    case SAVE_REGISTER.PENDING:
      return {
        ...state,
        loading: true
      }

    case SAVE_REGISTER.RESOLVED:
      return {
        ...state,
        loading: false,
        step: state.step + 1,
        error: false,
        dialogMessage: 'success',
        showDialog: true
      }

    case SAVE_REGISTER.REJECTED:
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
  'birth_at',
  'parent_relation',
  'telno_parent',

  // step2
  'known_via',
  'activities',
  'skill_computer',
  'past_camp'
]

export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  registerSubmit: (values) => {
    const data = prepareData(values, fields)
    data.gender_id = convertToInt(data.gender_id)
    data.religion_id = convertToInt(data.religion_id)
    data.edu_gpax = convertToFloat(data.edu_gpax)
    if (data.birth_at) {
      data.birth_at = data.birth_at.format('YYYY-MM-DD')
    }
    data.telno_personal = getOnlyNum(data.telno_personal)
    data.telno_parent = getOnlyNum(data.telno_parent)
    data.citizen_id = getOnlyNum(data.citizen_id)
    data.user_id = JSON.parse(localStorage.getItem('user')).id

    let { token } = cookie({req: false})
    if (dataIsNotNull(data)) {
      return {
        type: SAVE_REGISTER.ACTION,
        payload: api.post('/profiles', data, {Authorization: `Bearer ${token}`})
      }
    } else {
      return {
        type: SAVE_REGISTER.REJECTED
      }
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
