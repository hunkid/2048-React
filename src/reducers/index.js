import { combineReducers } from 'redux'
import piecelist from './piecelist'
import piecemap from './piecemap'
import score from './score'

const reducer = combineReducers({
  piecelist,
  piecemap,
  score
})

export default reducer
