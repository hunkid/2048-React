import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Piece from '../../components/Piece'
import Board from '../../components/Board'

import { connect } from 'react-redux'
import {changePiecePos, addPiece, delPiece} from '../../actions'

import {change2NewChess, applyPatches} from '../../util/chessUtil'
import {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  // DELETE,
  // ADD,
  // MOVE,
  LEFTKeyCode,
  RIGHTKeyCode,
  UPKeyCode,
  DOWNKeyCode
} from '../../constants/Control'

// import {store} from '../../index' // for test
class Chess extends Component {
  static defaultProps = {
    pieceNumPerCol: 4,
    posPieces: {}
  }
  constructor (props) {
    super(props)
    this._generateRandPiece = this._generateRandPiece.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    // this._handleClick = this._handleClick.bind(this)
    this._isGameOver = this._isGameOver.bind(this)
    this.state = {
      gameOver: false
    }
  }
  componentDidMount () {
    this._generateRandPiece()
    window.addEventListener('keydown', this._handleKeyDown, false)
  }
  // 更新状态时，需进行：生成新棋子、删除旧棋子，也就是遍历状态
  componentDidUpdate () {
  }
  /**
   * 在随机位置上生成随机棋子
   * @return {Object} 返回坐标、id、值
   *     - @param {Array<Number>} pos
   *     - @param {String} id
   *     - @param {Number} num
   */
  _generateRandPiece () {
    if (this.state.gameOver) {
      return void 1
    }
    let x = Math.floor(Math.random() * this.props.pieceNumPerCol)
    let y = Math.floor(Math.random() * this.props.pieceNumPerCol)
    // TODO 注意游戏结束
    while (this.props.pieceMap[x] && this.props.pieceMap[x][y] && this.props.pieceMap[x][y] !== 0) {
      x = Math.floor(Math.random() * this.props.pieceNumPerCol)
      y = Math.floor(Math.random() * this.props.pieceNumPerCol)
    }
    let num = Math.random() >= 0.5 ? 4 : 2
    let timeStap = Date.now()
    this.props.addPiece(timeStap, [x, y], num)
  }
  // _handleClick () {
  //   if (this.state.gameOver) {
  //     return void 1
  //   }
  //   let isOver = this._isGameOver()
  //   if (isOver) {
  //     return
  //   }
  //   this._generateRandPiece()
  // }
  _handleKeyDown (e) {
    if (this.state.gameOver) {
      return void 1
    }
    let chess = JSON.parse(JSON.stringify(this.props.pieceMap))
    let patches
    switch (e.keyCode) {
      case LEFTKeyCode:
        patches = change2NewChess(chess, LEFT, this.props.pieceNumPerCol) // tofix，这地方经过经过以后，state变化了，为什么，发现...是浅fuzhi，从state一路浅复制到这
        break
      case RIGHTKeyCode:
        patches = change2NewChess(chess, RIGHT, this.props.pieceNumPerCol)
        break
      case UPKeyCode:
        patches = change2NewChess(chess, UP, this.props.pieceNumPerCol)
        break
      case DOWNKeyCode:
        patches = change2NewChess(chess, DOWN, this.props.pieceNumPerCol)
        break
      default:
        break
    }
    if (patches && patches.moves && patches.moves.length) { // 说明有移动
      applyPatches(patches)
      patches = null
      this._generateRandPiece()
      if (this._isGameOver()) {
        this.state.gameOver = true
        this.setState({
          gameOver: true
        })
      }
    }
    return false
  }
  _isGameOver () {
    let chess = JSON.parse(JSON.stringify(this.props.pieceMap))
    let flag = true, n = this.props.pieceNumPerCol
    l1: for (let k = 0; k < n; k++) {
      chess[k] = chess[k] || []
      chess[k + 1] = chess[k + 1] || []
      for (let i = 0; i < n - 1; i++) {
        if (!chess[k][i] || chess[k][i] === 0 || !chess[k][i + 1] || chess[k][i + 1] === 0 || chess[k][i]['num'] === chess[k][i + 1]['num']) {
          flag = false
          break l1
        // } else if (!chess[k][i] || chess[k][i] === 0 || (!chess[k + 1][i] && k < n - 1) || chess[k + 1][i] === 0 || chess[k][i]['num'] === chess[k + 1][i]['num']) {
        } else if (!chess[k][i] || chess[k][i] === 0 || (chess[k + 1] && chess[k + 1][i] && chess[k][i]['num'] === chess[k + 1][i]['num'])) {
          flag = false
          break l1
        }
      }
    }
    if (flag) {
      setTimeout(function() {
        alert('Game Over!')
      }, 500)
    }
    return flag
  }
  render () {
    return (
      <div>
        <Board>
          {/* {this.state.pieces.map((piece, i) => piece)} */}
          {Object.keys(this.props.posPieces).map((key, i) => {
            return <Piece pos={this.props.posPieces[key].curPos} key={key} number={this.props.posPieces[key].num}/>
          })}
        </Board>
      </div>
    )
  }
}
Chess.propTypes = {
  pieceNumPerCol: PropTypes.number,
  posPieces: PropTypes.object,
  pieceMap: PropTypes.array,
  addPiece: PropTypes.func,
  changePiecePos: PropTypes.func,
  delPiece: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    posPieces: state.piecelist,
    pieceMap: state.piecemap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 增加棋子
    addPiece: (id, pos, num) => {
      dispatch(addPiece(id, pos, num))
    },
    // 变换棋子位置
    changePiecePos: (id, oldPos, newPos) => {
      dispatch(changePiecePos(id, oldPos, newPos))
    },
    // 删除棋子
    delPiece: (id) => {
      dispatch(delPiece(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chess)

// export default Chess
