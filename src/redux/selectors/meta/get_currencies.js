import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.META

export default (state) => {
  return _get(state, `${path}.currencies`, {})
}
