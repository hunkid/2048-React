import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Piece from '../../components/Piece'
import Board from '../../components/Board'

import { connect } from 'react-redux'
import {changePiecePos, addPiece, delPiece} from '../../actions'

var mmm,nnn
class Chess extends Component {
  static defaultProps = {
    pieceNumPerCol: 4,
    posPieces: {}
  }
  constructor (props) {
    super(props)
    this._generateRandPiece = this._generateRandPiece.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.state = {
      pieces: [],
      posPieces: {}
    }
  }
  componentDidMount () {
    window.addEventListener('keydown', this._handleKeyDown)
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
    let x = Math.floor(Math.random() * 4)
    let y = Math.floor(Math.random() * 4)
    // TODO 注意游戏结束
    while (this.props.pieceMap[x] && this.props.pieceMap[x][y] && this.props.pieceMap[x][y] !== 0) {
      x = Math.floor(Math.random() * 4)
      y = Math.floor(Math.random() * 4)
    }
    let num = Math.random() >= 0.5 ? 4 : 2
    let timeStap = Date.now()
    mmm = [x, y] // TODO
    nnn = timeStap
    return {
      pos: [x, y],
      id: timeStap,
      num
    }
  }
  _handleClick () {
    // console.log(this.props.pieceMap)
    let {pos, id, num} = this._generateRandPiece()
    if(this.props.addPiece) {
      this.props.addPiece(id, pos, num) // TODO， 随机生成2或者4
    }
    console.log(this.props.pieceMap)
  }
  _handleKeyDown () {
    if(this.props.changePiecePos) {
      this.props.changePiecePos(nnn, mmm, [0, 0])
    }
  }
  render () {
    return (
      <div onClick={this._handleClick.bind(this)}>
        <Board>
          {/* {this.state.pieces.map((piece, i) => piece)} */}
          {Object.keys(this.props.posPieces).map((key, i) => {
            return <Piece pos={this.props.posPieces[key].curPos} key={key} number={this.props.posPieces[key].num}/> //TODO: 尚未考虑产生数字
          })}
        </Board>
      </div>
      
    )
  }
}
Chess.propTypes = {
  pieceNumPerCol: PropTypes.number, // TO DELETE
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
    addPiece: (id, pos, piece) => {
      dispatch(addPiece(id, pos, piece))
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
