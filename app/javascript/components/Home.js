import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Registration from './auth/Registration';
// import Login from './auth/Login';
// import { handleAjaxError } from '../helpers/helpers';

const Home = (props) => {
  const { loggedInStatus } = props;
  const { userRoleID } = props;
  const navigate = useNavigate();
  // const [dash, setDash] = useState('');
  console.log('Home: ', loggedInStatus);
  console.log('Home: userRoleID: ', userRoleID);
  // useEffect(() => {
  //   if (userRoleID === 1) {
  //     setDash('/expenses');
  //   } else {
  //     setDash('/revenues');
  //   }
  // }, [userRoleID]);

  // const handleSuccessfulAuth = (data) => {
  //   console.log('Home: handleSuccessfulAuth: data: ', data);
  //   handleLogin(data);
  // };

  return (
    <div>
      {/* { loggedInStatus === 'NOT_LOGGED_IN' ? (
        <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      ) : (
        navigate(dash)
      )} */}
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
  userRoleID: PropTypes.number.isRequired,
};

export default Home;
