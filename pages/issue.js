import Issue from '../components/issue/Main'
import { compose } from 'recompose'
import wrapper from '../store/wrapper'

export default compose(
  wrapper
)(Issue)
