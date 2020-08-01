import React from 'react';
import PropTypes from 'prop-types';
import './PanelControl.scss';

const PanelControl = ({
  playing,
  doResetMatrix,
  doResetSteps,
  doStartTimer,
  steps,
  timer,
  gameStatus,
}) => (
  <div className="panel-container">
    <div className="buttons">
      <button onClick={doStartTimer} className="button" disabled={playing}>
        Start
      </button>
      <button onClick={doResetMatrix} className="button">
        Reset
      </button>
      <button
        className="button"
        onClick={doResetSteps}
        disabled={gameStatus.status !== 'lost'}
      >
        Try Again
      </button>
    </div>
    <div className="steps">Steps: {steps}</div>
    <div className="steps">Timer: {timer}</div>
  </div>
);

PanelControl.propTypes = {
  playing: PropTypes.bool.isRequired,
  doResetMatrix: PropTypes.func.isRequired,
  steps: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  doStartTimer: PropTypes.func.isRequired,
  doResetSteps: PropTypes.func.isRequired,
  gameStatus: PropTypes.object.isRequired,
};

export default PanelControl;
