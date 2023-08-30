import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';
import { connect } from 'react-redux';

function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props;
  //return active class name based on wheel state
  const getActiveClass = (index) => {
    return wheel === index ? 'active' : '';
  };
  const getLetter = (index) => {
    return wheel === index ? 'B' : '';
  };

    return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${getActiveClass(0)}`} style={{ "--i": 0 }}>{getLetter(0)}</div>
        <div className={`cog ${getActiveClass(1)}`} style={{ "--i": 1 }}>{getLetter(1)}</div>
        <div className={`cog ${getActiveClass(2)}`} style={{ "--i": 2 }}>{getLetter(2)}</div>
        <div className={`cog ${getActiveClass(3)}`} style={{ "--i": 3 }}>{getLetter(3)}</div>
        <div className={`cog ${getActiveClass(4)}`} style={{ "--i": 4 }}>{getLetter(4)}</div>
        <div className={`cog ${getActiveClass(5)}`} style={{ "--i": 5 }}>{getLetter(5)}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}
// maps redux state of props
const mapStateProps = (state) => {
  return{
    wheel: state.wheel, // get the weel state from store. 
  };
};
const mapDispatchProps = (dispatch) => {
  return {
    moveClockwise: () => dispatch(moveClockwise()),
    moveCounterClockwise: () => dispatch(moveCounterClockwise()),
  };
};

export default connect(mapStateProps, mapDispatchProps)(Wheel);
