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
  LEFTKeyCode,
  RIGHTKeyCode,
  UPKeyCode,
  DOWNKeyCode
} from '../../constants/Control'

const uuidv1 = require('uuid/v1')

class Chess extends Component {
  static defaultProps = {
    pieceNumPerCol: 4,
    posPieces: {}
  }
  constructor (props) {
    super(props)
    this._generateRandPiece = this._generateRandPiece.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._isGameOver = this._isGameOver.bind(this)
    this._handleGameOver = this._handleGameOver.bind(this)
    this.state = {
      gameOver: false
    }
  }
  componentDidMount () {
    this._generateRandPiece()
    window.addEventListener('keydown', this._handleKeyDown, false)
  }
  componentDidUpdate () {
  }

  _generateRandPiece () {
    if (this.state.gameOver) {
      return void 1
    }
    let x = Math.floor(Math.random() * this.props.pieceNumPerCol)
    let y = Math.floor(Math.random() * this.props.pieceNumPerCol)
    while (this.props.pieceMap[x] && this.props.pieceMap[x][y] && this.props.pieceMap[x][y] !== 0) {
      x = Math.floor(Math.random() * this.props.pieceNumPerCol)
      y = Math.floor(Math.random() * this.props.pieceNumPerCol)
    }
    let num = Math.random() >= 0.5 ? 4 : 2
    let id = uuidv1() // 基于时间戳的uuid
    this.props.addPiece(id, [x, y], num, true)
  }
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
        }
      }
      for (let i = 0; i < n; i++) {
        if (!chess[k][i] || chess[k][i] === 0 || (chess[k + 1] && chess[k + 1][i] && chess[k][i]['num'] === chess[k + 1][i]['num'])) {
          flag = false
          break l1
        }
      }
    }
    if (flag) {
      this._handleGameOver()
    }
    return flag
  }
  _handleGameOver () {
    if (this.props.gameOverFunc) {
      this.props.gameOverFunc()
    } else {
      setTimeout(function() {
        alert('Game Over!')
      }, 500)
    }
  }
  render () {
    return (
      <div>
        <Board>
          {Object.keys(this.props.posPieces).map((key, i) => {
            return <Piece
                     pos={this.props.posPieces[key].curPos}
                     key={key} number={this.props.posPieces[key].num}
                     isAnimationNeed={this.props.posPieces[key].isAnimationNeed}/>
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
  gameOverFunc: PropTypes.func
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
    addPiece: (id, pos, num, isAnimationNeed) => {
      dispatch(addPiece(id, pos, num, isAnimationNeed))
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
