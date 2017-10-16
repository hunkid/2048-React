import * as types from '../constants/ActionTypes'

/**
 * {
 *   201710130584: {
 *     curPos: [1,1],
 *     prevPos: [0,0],
 *     num: 2
 *   }
 * }
 * 
 */
// tips:删除根据id删
export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_PIECE:
      return {
        ...state,
        [action.id]: {
          curPos: action.pos,
          prevPos: null,
          num: action.num,
          isAnimationNeed: action.isAnimationNeed
        }
      }
    case types.CHANGE_PIECE_POS:
      let num = state[action.id].num
      return {
        ...state,
        [action.id]: {
          curPos: action.newPos,
          prevPos: action.oldPos,
          num
        }
      }
    case types.DEL_PIECE:
      let newState = {...state}
      delete newState[action.id]
      return newState
    default:
      return state
  }
}
