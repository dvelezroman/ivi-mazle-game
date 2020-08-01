import React from 'react';
import PropTypes from 'prop-types';
import './PanelControl.scss';

const PanelControl = ({ doResetMatrix, steps }) => (
  <div className="panel-container">
    <div className="buttons">
      <button onClick={doResetMatrix}>Reset</button>
    </div>
    <div className="steps">Steps: {steps}</div>
  </div>
);

PanelControl.propTypes = {
  doResetMatrix: PropTypes.func.isRequired,
  steps: PropTypes.number.isRequired,
};

export default PanelControl;
