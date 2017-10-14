
// import { dispatch } from '../redux/store/store'

import {LEFT, RIGHT, UP, DOWN, DELETE, ADD, MOVE} from '../constants/Control'
import {changePiecePos, addPiece, delPiece} from '../actions'
import {store} from '../index' // TODO 后期可能会将store独立出去
/**
 * 
 * @param {Array<Array<Object | undefined | 0> >} chess 如[[0,0,0,{id: '', num: 2}],[{id: '', num: 2},0,0,0],[0,{id: '', num: 2},0,0],[{id: '', num: 2},{id: '', num: 2},0,0]] 
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
    case RIGHT:
      handleRight(chess, patches, n)
      break
    case UP:
      handleUP(chess, patches, n)
      break
    case DOWN:
      handleDOWN(chess, patches, n)
      break
    default:
      break
  }
  return patches
}


export function applyPatches(patches) {
  if (patches && patches.moves) {
    patches.moves.forEach((patch) => {
      switch(patch.type) {
        case DELETE:
          store.dispatch(delPiece(patch.id, patch.pos))
          break
        case ADD:
          let timeStap = Date.now()
          store.dispatch(addPiece(timeStap, patch.pos, patch.num))
          break
        case MOVE:
          store.dispatch(changePiecePos(patch.id, patch.oldPos, patch.newPos))
          break
        default:
          break
      }
    })
  }
}

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
      while (j < n && (chess[k][j] === 0 || chess[k][j] === undefined || chess[k][j] === null)) {
        j++
      }
      if (j >= n) {
        break
      }
      if (chess[k][i] === 0 || chess[k][i] === undefined || chess[k][i] === null) {  // 前者i为空，直接移，后保持i不动，j加1
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
          if (j !== i + 1) {
            chess[k][i + 1] = chess[k][j]
            chess[k][j] = 0
            oldPos = [k, j]
            newPos = [k, i + 1]
            addMOVEPatch(chess[k][i + 1]['id'], oldPos, newPos, patches)
          }
        }
        i++
        j++
      }
    }
  }
}

function handleRight(chess, patches, n) {
  let i, j
  let laterId, formerId
  for (let k = 0; k < n; k++) {
    if (!chess[k]) {
      continue
    }
    i = n - 1
    j = i - 1
    while (j >= 0) {
      let oldPos, newPos
      while (j >= 0  && (chess[k][j] === 0 || chess[k][j] === undefined || chess[k][j] === null)) {
        j--
      }
      if (j < 0) {
        break
      }
      if (chess[k][i] === 0 || chess[k][i] === undefined || chess[k][i] === null) {  // 前者i为空，直接移，后保持i不动，j加1
        oldPos = [k, j]
        newPos = [k, i]
        chess[k][i] = chess[k][j]
        chess[k][j] = 0
        addMOVEPatch(chess[k][i]['id'], oldPos, newPos, patches)
        j--
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
          if (j !== i - 1) {
            chess[k][i - 1] = chess[k][j]
            chess[k][j] = 0
            oldPos = [k, j]
            newPos = [k, i - 1]
            addMOVEPatch(chess[k][i - 1]['id'], oldPos, newPos, patches)
          }
        }
        i--
        j--
      }
    }
  }
}

function handleUP(chess, patches, n) {
  let i, j
  let laterId, formerId
  for (let k = 0; k < n; k++) {
    i = 0
    j = i + 1
    chess[j] = chess[j] || []
    while (j < n) {
      let oldPos, newPos
      while (j < n && (chess[j][k] === 0 || chess[j][k] === undefined || chess[j][k] === null)) {
        j++
        chess[j] = chess[j] || []
      }
      if (j >= n) {
        chess[j] = undefined
        break
      }
      if (!chess[i] || chess[i][k] === 0 || chess[i][k] === undefined || chess[i][k] === null) {  // 前者i为空，直接移，后保持i不动，j加1
        oldPos = [j, k]
        newPos = [i, k]
        chess[i] = chess[i] || []
        chess[i][k] = chess[j][k]
        chess[j][k] = 0
        addMOVEPatch(chess[i][k]['id'], oldPos, newPos, patches)
        j++
      } else { // 前者i是不为空的
        if (chess[i][k]['num'] === chess[j][k]['num']) { //j位置不为0，若二者相等，则应合并至i位置，后将i、j向后挪1
          oldPos = [j, k]
          newPos = [i, k]
          laterId = chess[j][k]['id']
          formerId = chess[i][k]['id']
          chess[i][k]['num'] += chess[j][k]['num'] // 忽略了id，因为新增一次只关注其num
          chess[j][k] = 0
          addMOVEPatch(laterId, oldPos, newPos, patches)
          addDELETEPatch(formerId, newPos, patches) // 与下一条都是newPos，实际上是不需要的pos的
          addDELETEPatch(laterId, newPos, patches)
          addADDPatch(newPos, chess[i][k]['num'], patches)
        } else {
          if (j !== i + 1) {
            chess[i + 1][k] = chess[j][k]
            chess[j][k] = 0
            oldPos = [j, k]
            newPos = [i + 1, k]
            addMOVEPatch(chess[i + 1][k]['id'], oldPos, newPos, patches)
          }
        }
        i++
        j++
      }
    }
  }
}

function handleDOWN(chess, patches, n) {
  let i, j
  let laterId, formerId
  for (let k = 0; k < n; k++) {
    i = n - 1
    j = i - 1
    chess[j] = chess[j] || []
    while (j >= 0) {
      let oldPos, newPos
      while (j >= 0 && (chess[j][k] === 0 || chess[j][k] === undefined || chess[j][k] === null)) {
        j--
        chess[j] = chess[j] || []
      }
      if (j < 0) {
        chess[j] = undefined
        break
      }
      if (!chess[i] || chess[i][k] === 0 || chess[i][k] === undefined || chess[i][k] === null) {  // 前者i为空，直接移，后保持i不动，j加1
        oldPos = [j, k]
        newPos = [i, k]
        chess[i] = chess[i] || []
        chess[i][k] = chess[j][k]
        chess[j][k] = 0
        addMOVEPatch(chess[i][k]['id'], oldPos, newPos, patches)
        j--
      } else { // 前者i是不为空的
        if (chess[i][k]['num'] === chess[j][k]['num']) { //j位置不为0，若二者相等，则应合并至i位置，后将i、j向后挪1
          oldPos = [j, k]
          newPos = [i, k]
          laterId = chess[j][k]['id']
          formerId = chess[i][k]['id']
          chess[i][k]['num'] += chess[j][k]['num'] // 忽略了id，因为新增一次只关注其num
          chess[j][k] = 0
          addMOVEPatch(laterId, oldPos, newPos, patches)
          addDELETEPatch(formerId, newPos, patches) // 与下一条都是newPos，实际上是不需要的pos的
          addDELETEPatch(laterId, newPos, patches)
          addADDPatch(newPos, chess[i][k]['num'], patches)
        } else {
          if (j !== i - 1) {
            chess[i - 1][k] = chess[j][k]
            chess[j][k] = 0
            oldPos = [j, k]
            newPos = [i - 1, k]
            addMOVEPatch(chess[i - 1][k]['id'], oldPos, newPos, patches)
          }
        }
        i--
        j--
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
