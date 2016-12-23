import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from './Square';
import Knight from './Knight';

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      knightPosition: this.props.knightPosition
    }

    this.changeToRandomPos = this.changeToRandomPos.bind(this)
    this.handleMoveKnight = this.handleMoveKnight.bind(this)
    this.canMoveKnight = this.canMoveKnight.bind(this)
  }

  changeToRandomPos() {
    const randomPos = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]

    this.setState({ knightPosition: randomPos })
  }

  canMoveKnight(toX, toY) {
    const [x, y] = this.state.knightPosition;

    const deltaX = toX - x;
    const deltaY = toY - y;

    return (Math.abs(deltaX) === 2 && Math.abs(deltaY) === 1) ||
           (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 2);
  }

  handleMoveKnight(x ,y) {
    if (this.canMoveKnight(x, y)) {
      this.setState({ knightPosition: [x, y] })
    } else {
      alert('Invalid move: knight cannot go there.')
    }
  }

  componentDidMount() {
    //setInterval(() => { this.changeToRandomPos() }, 200);
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.state.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i}
           onClick={() => this.handleMoveKnight(x, y) }
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div className="chess-board" style={{
        width: '1000px',
        height: '1000px',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);