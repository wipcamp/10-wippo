import issue from './issue'
import createIssue from './issue.create'
import editIssue from './issue.edit'
import detailIssue from './issue.detail'
import register from './register'
import profile from './profile'
import { reducer as form } from 'redux-form'

export default {
  register,
  issue,
  createIssue,
  editIssue,
  detailIssue,
  form,
  profile
}
