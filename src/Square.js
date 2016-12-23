import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

const squareTarget = {
  drop(props) {

    props.moveKnightCallback(props.xCoord, props.yCoord)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Square extends Component {
  render() {
    const { black, connectDropTarget, isOver } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return connectDropTarget(
      <div
        className="board-square"
        style={{
          backgroundColor: !isOver ? fill : 'orange',
          color: stroke,
          width: '100%',
          height: '100%'
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(Square);