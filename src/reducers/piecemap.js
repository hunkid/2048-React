import * as types from '../constants/ActionTypes'
/**
 * [
 *    [0, {id：'201710130528',num:2}, '0', '0'],
 *    [0, '0', {id：'201710130548',num:2}, '0'],
 *    [{id：'2017101305438',num:2}, '0', {id：'2017101305548',num:2}, '0'],
 *    [0, 0, 0, 0]
 *  ]
 */
// tips: 删除只根据位置删
export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_PIECE:
      let newState = [...state]
      newState[action.pos[0]] = newState[action.pos[0]] || []
      newState[action.pos[0]][action.pos[1]] = {id: action.id, num: action.num}
      return newState
    case types.CHANGE_PIECE_POS:
      newState = [...state]
      newState[action.newPos[0]] = newState[action.newPos[0]] || []
      newState[action.newPos[0]][action.newPos[1]] = newState[action.oldPos[0]][action.oldPos[1]]
      newState[action.oldPos[0]][action.oldPos[1]] = 0
      return newState
    case types.DEL_PIECE:
      newState = [...state]
      newState[action.pos[0]] = newState[action.pos[0]] || []
      newState[action.pos[0]][action.pos[1]] = 0
      return newState
    default:
      return state
  }
}
