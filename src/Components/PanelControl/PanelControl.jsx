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
      <button
        id="start"
        onClick={doStartTimer}
        className="button"
        disabled={playing}
      >
        Start
      </button>
      <button id="reset" onClick={doResetMatrix} className="button">
        Reset
      </button>
      <button
        id="try-again"
        className="button"
        onClick={doResetSteps}
        disabled={gameStatus.status !== 'lost'}
      >
        Try Again
      </button>
    </div>
    <div id="steps" className="steps">
      Steps: {steps}
    </div>
    <div id="timer" className="steps">
      Timer: {timer}
    </div>
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
