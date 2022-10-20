import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';
import Registration from './auth/Registration';
import MainAppBar from './MainAppBar';
import Expenses from './expenses/Expenses';
import Revenues from './revenues/Revenues';
import Accounts from './accounts/Accounts';
import { handleAjaxError } from '../helpers/helpers';
import './App.css';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      axios
        .get('/logged_in', { withCredentials: true })
        .then((response) => {
          // console.log('App: checkLoginStatus: response: ', response);
          if (
            response.data.logged_in
            && loggedInStatus === 'NOT_LOGGED_IN'
          ) {
            setLoggedInStatus('LOGGED_IN');
            setUser(response.data.user);
            // console.log('App: checkLoginStatus: user: ', user);
          } else if (
            !response.data.logged_in
            && loggedInStatus === 'LOGGED_IN'
          ) {
            setLoggedInStatus('NOT_LOGGED_IN');
            setUser({});
            // console.log('App: checkLoginStatus:', loggedInStatus);
          }
        })
        .catch((error) => {
          console.log('App: checkLoginStatus: error: ', error);
          handleAjaxError(error);
        });
    };
    checkLoginStatus();
    console.log('App: useEffect: checkLoginStatus: ', loggedInStatus);
    // console.log('App: useEffect: checkLoginStatus: user: ', user);
  }, [loggedInStatus]);

  const handleLogin = (data) => {
    console.log('App: handleLogin: data: ', data);
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
  };

  const handleLogout = () => {
    console.log('App: handleLogout: ');
    setLoggedInStatus('NOT_LOGGED_IN');
    setUser({});
  };

  const handleLogoutClick = () => {
    axios
      .delete('/logout', { withCredentials: true })
      .then((response) => {
        console.log('Home: handleLogoutClick: response: ', response);
        handleLogout();
        navigate('/');
      })
      .catch((error) => {
        console.log('Home: handleLogoutClick: error: ', error);
        handleAjaxError(error);
      });
  };

  return (
    <ConfirmProvider>
      {loggedInStatus === 'LOGGED_IN' ? (
        <MainAppBar
          userRoleID={user.role_id}
          userEmail={user.email}
          loggedInStatus={loggedInStatus}
          handleLogoutClick={handleLogoutClick}
        />
      ) : null}

      <Container maxWidth="xl">
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <Home
                handleLogin={handleLogin}
                loggedInStatus={loggedInStatus}
                // handleLogout={handleLogout}
              />
            )}
          />
          <Route
            path="/dashboard"
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/registration"
            element={<Registration loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/expenses/*"
            element={<Expenses loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/revenues/*"
            element={<Revenues loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/accounts/*"
            element={<Accounts loggedInStatus={loggedInStatus} />}
          />
        </Routes>
        <ToastContainer />
      </Container>
    </ConfirmProvider>
  );
};

export default App;
