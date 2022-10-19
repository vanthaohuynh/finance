import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Registration from './auth/Registration';
import Login from './auth/Login';
import { handleAjaxError } from '../helpers/helpers';

const Home = (props) => {
  const { loggedInStatus } = props;
  const { handleLogin } = props;
  const navigate = useNavigate();
  console.log('Home: loggedInStatus: ', loggedInStatus);

  const handleSuccessfulAuth = (data) => {
    // console.log('Home: handleSuccessfulAuth: data: ', data);
    // Update parent state
    console.log('Home: handleSuccessfulAuth: data: ', data);
    handleLogin(data);
    console.log('Data:', data.user.role_id);
    if (data.user.role_id === 1) {
      navigate('/expenses');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      {/* <h1>Home</h1> */}
      {/* <h3>
        Status:
        {loggedInStatus}
      </h3> */}
      {/* <Registration handleSuccessfulAuth={handleSuccessfulAuth} /> */}
      {/* <button type="button" onClick={() => handleLogoutClick()}>
        Log out
      </button> */}
      { loggedInStatus === 'NOT_LOGGED_IN' ? (
        <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      ) : (
        navigate('/dashboard')
      )}
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Home;
