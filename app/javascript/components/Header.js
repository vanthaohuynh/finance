import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { header } = props;
  return (
    <header>
      <h1>{header}</h1>
    </header>
  );
};

Header.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Header;
