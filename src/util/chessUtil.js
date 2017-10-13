
import {LEFT, RIGHT, TOP, DOWN, DELETE, ADD, MOVE} from '../constants/Control'

/**
 * 
 * @param {Array<Array<Number>>} chess 如[[0,0,0,2],[2,0,0,0],[0,2,0,0],[2,2,0,0]] 
 * @param {Number} flag
 */
export function change2NewChess(chess, flag) {
  if (!chess || !flag) {
    return
  }
  let rowNum = chess.length
  let colNum = chess[0].length
  let patches = {}
  patches.moves = []
  if (rowNum !== colNum) {
    return
  }
  switch (flag) {
    case LEFT:
      handleLeft(chess, patches)
      break
    default:
      break
  }
}

function handleLeft(chess, patches) {
  let n = chess.length
  let i, j
  for (let k = 0; k < n; k++) {
    i = 0
    j = i + 1
    while (j < n) {
      let oldPos, newPos
      while (j < n && chess[k][j] === 0) {
        j++
      }
      if (j >= n) {
        break
      }
      if (chess[k][i] === chess[k][j]) { //j位置不为0，若二者相等，则应合并至i位置，后将i、j向后挪1
        oldPos = [k, j]
        newPos = [k, i]
        chess[k][i] += chess[k][j]
        chess[k][j] = 0
        addMOVEPatch(oldPos, newPos, patches)
        addDELETEPatch(oldPos, patches)
        addDELETEPatch(newPos, patches)
        addADDPatch(newPos, chess[k][i], patches)
      } else {
        chess[k][i + 1] = chess[k][j]
        chess[k][j] = 0
        oldPos = [k, j]
        newPos = [k, i + 1]
        chess[k][i + 1] = chess[k][j]
        chess[k][j] = 0
        addMOVEPatch(oldPos, newPos, patches)
      }
      i++
      j++
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

function addMOVEPatch(oldPos, newPos, patches) {
  patches.moves.push({
    type: MOVE,
    oldPos,
    newPos
  })
}

function addDELETEPatch(pos, patches) {
  patches.moves.push({
    type: DELETE,
    pos
  })
}
