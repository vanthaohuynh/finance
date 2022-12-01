import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer } from 'react-toastify';
// import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';
// import Registration from './auth/Registration';
import MainAppBar from './MainAppBar';
import Expenses from './expenses/Expenses';
import Revenues from './revenues/Revenues';
import Accounts from './accounts/Accounts';
// import Transactions from './transactions/Transactions';
import { handleAjaxError } from '../helpers/helpers';
import './App.css';
import ExpenseCategories from './categories/expense/ExpenseCategories';
import RevenueCategories from './categories/revenue/RevenueCategories';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = JSON.parse(window.localStorage.getItem('user'));
    const getToken = window.localStorage.getItem('token');
    console.log('App: useEffect: localStorage: user', getUser);
    console.log('App: useEffect: localStorage: token', getToken);
    if (getUser && getToken) {
      setLoggedInStatus('LOGGED_IN');
      setUser(getUser);
      setToken(getToken);
      console.log('App: useEffect: localStorage: loggedInStatus', loggedInStatus);
      console.log('App: useEffect: localStorage: user and token', getUser, getToken);
    }
  }, []); // Leave the array empty to run only once.

  const handleLogin = (data) => {
    console.log('App: handleLogin: data: ', data);
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
    setToken(data.token);
    window.localStorage.setItem('user', JSON.stringify(data.user));
    window.localStorage.setItem('token', data.token);
    console.log('App: handleLogin: setlocalStorage: user', window.localStorage.getItem('user'));
    console.log('App: handleLogin: setlocalStorage: token', window.localStorage.getItem('token'));
  };

  const handleLogout = () => {
    setLoggedInStatus('NOT_LOGGED_IN');
    setUser({});
    setToken('');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    navigate('/');
  };

  const handleSelectedIndex = (index) => {
    console.log('App: handleSelectedIndex: index: ', index);
    setSelectedIndex(index);
  };

  return (
    <ConfirmProvider>
      {loggedInStatus === 'LOGGED_IN' ? (
        <MainAppBar
          userRoleID={user.role_id}
          userEmail={user.email}
          loggedInStatus={loggedInStatus}
          handleLogout={handleLogout}
          selectedIndex={selectedIndex}
          handleSelectedIndex={handleSelectedIndex}
          // handleLogoutClick={handleLogoutClick}
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
            element={(
              <Dashboard
                token={token}
                handleSelectedIndex={handleSelectedIndex}
              />
            )}
          />
          {/* <Route
            path="/registration"
            element={<Registration loggedInStatus={loggedInStatus} />}
          /> */}
          {/* <Route
            path="/transactions/*"
            element={<Transactions token={token} />}
          /> */}
          <Route
            path="/expenses/*"
            element={(
              <Expenses
                token={token}
                handleSelectedIndex={handleSelectedIndex}
              />
            )}
          />
          <Route
            path="/revenues/*"
            element={(
              <Revenues
                token={token}
                handleSelectedIndex={handleSelectedIndex}
              />
            )}
          />
          <Route
            path="/accounts/*"
            element={(
              <Accounts
                token={token}
                handleSelectedIndex={handleSelectedIndex}
              />
            )}
          />
          <Route
            path="/expense_categories/*"
            element={<ExpenseCategories token={token} />}
          />
          <Route
            path="/revenue_categories/*"
            element={<RevenueCategories token={token} />}
          />
        </Routes>
        <ToastContainer />
      </Container>
    </ConfirmProvider>
  );
};

export default App;
