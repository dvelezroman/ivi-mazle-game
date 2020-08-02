import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Status.scss';

const Status = ({ gameStatus }) => (
  <div
    className={classNames({
      statusContainer: true,
      success: gameStatus.status === 'won',
      fail: gameStatus.status === 'lost',
    })}
  >
    {gameStatus.message}
  </div>
);

Status.propTypes = {
  gameStatus: PropTypes.object,
};

export default Status;
