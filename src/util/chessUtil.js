
// import { dispatch } from '../redux/store/store'

import {LEFT, RIGHT, TOP, DOWN, DELETE, ADD, MOVE} from '../constants/Control'
// import {changePiecePos, addPiece, delPiece} from '../../actions'
/**
 * 
 * @param {Array<Array<Object | undefined | 0>>} chess 如[[0,0,0,{id: '', num: 2}],[{id: '', num: 2},0,0,0],[0,{id: '', num: 2},0,0],[{id: '', num: 2},{id: '', num: 2},0,0]] 
 * @param {Number} flag
 */
export function change2NewChess(chess, flag, n) {
  if (!chess || !flag) {
    return
  }
  let patches = {}
  patches.moves = []
  switch (flag) {
    case LEFT:
      handleLeft(chess, patches, n)
      break
    default:
      break
  }
  return patches
}

// export function applyPatches(patches) {
//   patches.moves.forEach((patch) => {
//     switch(patch) {
//       case DELETE:

//     }
//   })
// }

function handleLeft(chess, patches, n) {
  let i, j
  let laterId, formerId
  for (let k = 0; k < n; k++) {
    if (!chess[k]) {
      continue
    }
    i = 0
    j = i + 1
    while (j < n) {
      let oldPos, newPos
      while (j < n && (chess[k][j] === 0 || chess[k][j] === undefined)) {
        j++
      }
      if (j >= n) {
        break
      }
      if (chess[k][i] === 0 || chess[k][i] === undefined) {  // 前者i为空，直接移，后保持i不动，j加1
        oldPos = [k, j]
        newPos = [k, i]
        chess[k][i] = chess[k][j]
        chess[k][j] = 0
        addMOVEPatch(chess[k][i]['id'], oldPos, newPos, patches)
        j++
      } else { // 前者i是不为空的
        if (chess[k][i]['num'] === chess[k][j]['num']) { //j位置不为0，若二者相等，则应合并至i位置，后将i、j向后挪1
          oldPos = [k, j]
          newPos = [k, i]
          laterId = chess[k][j]['id']
          formerId = chess[k][i]['id']
          chess[k][i]['num'] += chess[k][j]['num'] // 忽略了id，因为新增一次只关注其num
          chess[k][j] = 0
          addMOVEPatch(laterId, oldPos, newPos, patches)
          addDELETEPatch(formerId, newPos, patches) // 与下一条都是newPos，实际上是不需要的pos的
          addDELETEPatch(laterId, newPos, patches)
          addADDPatch(newPos, chess[k][i]['num'], patches)
        } else {
          chess[k][i + 1] = chess[k][j]
          chess[k][j] = 0
          oldPos = [k, j]
          newPos = [k, i + 1]
          addMOVEPatch(chess[k][i + 1]['id'], oldPos, newPos, patches)
        }
        i++
        j++
      }
    }
  }
}

function addADDPatch(pos, num, patches) {
  patches.moves.push({
    type: ADD,
    pos,
    num
  })
}

function addMOVEPatch(id, oldPos, newPos, patches) {
  patches.moves.push({
    type: MOVE,
    id,
    oldPos,
    newPos
  })
}

function addDELETEPatch(id, pos, patches) {
  patches.moves.push({
    type: DELETE,
    id,
    pos
  })
}
