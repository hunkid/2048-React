import * as types from '../constants/ActionTypes'

export default (state = {}, action) => {
  state.score = state.score || 0
  switch (action.type) {
    case types.ADD_PIECE:
      let newScore = state.score + action.num
      return {
        score: newScore
      }
    default:
      return state
  }
}
