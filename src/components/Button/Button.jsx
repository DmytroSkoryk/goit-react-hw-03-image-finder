import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, isVisible }) => (
  <button
    type="button"
    className={css.button}
    onClick={onClick}
    style={{ display: isVisible ? 'block' : 'none' }}
  >
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
