import * as types from '../constants/ActionTypes'
/**
 * [
 *    [0, '201710130528', '0', '0'],
 *    [0, '0', '201710130548', '0'],
 *    ['202710130548', '0', '213710130548', '0'],
 *    [0, 0, 0, 0]
 *  ]
 */
export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_PIECE:
      let newState = [...state]
      newState[action.pos[0]] = newState[action.pos[0]] || []
      newState[action.pos[0]][action.pos[1]] = action.id
      return newState
    case types.CHANGE_PIECE_POS:
      newState = [...state]
      newState[action.oldPos[0]] = newState[action.oldPos[0]] || []
      newState[action.oldPos[1]] = 0
      newState[action.newPos[0]] = newState[action.newPos[0]] || []
      newState[action.newPos[1]] = action.id
      return newState
    case types.DEL_PIECE:
      newState = [...state]
      newState[action.pos[0]] = newState[action.pos[0]] || []
      newState[action.pos[1]] = 0
      return newState
    default:
      return state
  }
}
