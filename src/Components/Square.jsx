import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Square.scss';

const Square = ({ value, here }) => (
  <div className={classnames({ square: true, blank: value === 0 })}>
    {here && <div className="ivi"></div>}
  </div>
);

Square.propTypes = {
  value: PropTypes.number.isRequired,
  here: PropTypes.bool.isRequired,
};

export default Square;
