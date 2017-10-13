import { combineReducers } from 'redux'
import piecelist from './piecelist'
import piecemap from './piecemap'

const reducer = combineReducers({
  piecelist,
  piecemap
})

export default reducer
