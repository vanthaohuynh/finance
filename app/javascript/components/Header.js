import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { header } = props;
  return (
    <header>
      <Link to={`/${header}`.replace(/ /g, '_').toLowerCase()}>
        <h1>{header}</h1>
      </Link>
    </header>
  );
};

Header.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Header;
