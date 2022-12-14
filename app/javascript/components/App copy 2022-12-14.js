import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import PropTypes from 'prop-types';
// import Container from '@mui/material/Container';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer } from 'react-toastify';
// import axios from 'axios';
import Home from './Home';
import Login from './auth/Login';
import Dashboard from './Dashboard';
import Users from './admin/Users';
import Registration from './auth/Registration';
import MainAppBar from './MainAppBar';
import Expenses from './expenses/Expenses';
import Revenues from './revenues/Revenues';
import Accounts from './accounts/Accounts';
import { info } from '../helpers/notifications';
// import { handleAjaxError } from '../helpers/helpers';
import './App.css';
import ExpenseCategories from './categories/expense/ExpenseCategories';
import RevenueCategories from './categories/revenue/RevenueCategories';
import { Container } from '@mui/system';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [user, setUser] = useState({});
  const [userRoleID, setUserRoleID] = useState(0);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = JSON.parse(window.localStorage.getItem('user'));
    const getToken = window.localStorage.getItem('token');
    // console.log('App: useEffect: localStorage: user', getUser);
    // console.log('App: useEffect: localStorage: token', getToken);
    if (getUser && getToken) {
      setLoggedInStatus('LOGGED_IN');
      setUser(getUser);
      setUserRoleID(getUser.role_id);
      // info(`Welcome back, ${getUser.email}!`);
      if (getUser.role_id === 1) {
        navigate('/expenses');
      } else {
        navigate('/dashboard');
      }
      setToken(getToken);
      // console.log('App: useEffect: localStorage: loggedInStatus', loggedInStatus);
      // console.log('App: useEffect: localStorage: user and token', getUser, getToken);
    }
  }, []); // Leave the array empty to run only once.

  /* eslint-disable-next-line */
  // This ProtectedRoute causes error on User.js:
  // <User /> const { id } = useParams(); not working. Gives blank id. Very strange.
  /* eslint-disable-next-line */
  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/login',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    /* eslint-disable-next-line */
    return children ? children : <Outlet />;
  };

  ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool.isRequired,
    redirectPath: PropTypes.string,
    children: PropTypes.node,
  };
  ProtectedRoute.defaultProps = {
    redirectPath: '/login',
    children: null,
  };

  const handleLogin = (data) => {
    // console.log('App: handleLogin: data: ', data);
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
    setUserRoleID(data.user.role_id);
    // info(`Welcome back, ${data.user.email}!`);
    if (data.user.role_id === 1) {
      navigate('/expenses');
    } else {
      navigate('/dashboard');
    }
    setToken(data.token);
    window.localStorage.setItem('user', JSON.stringify(data.user));
    window.localStorage.setItem('token', data.token);
    // console.log('App: handleLogin: setlocalStorage: user', window.localStorage.getItem('user'));
    // console.log('App: handleLogin: setlocalStorage: token', window.localStorage.getItem('token'));
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
    // console.log('App: handleSelectedIndex: index: ', index);
    setSelectedIndex(index);
  };

  return (
    <ConfirmProvider>
      <ToastContainer />
      {loggedInStatus === 'NOT_LOGGED_IN' ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <MainAppBar
            userRoleID={userRoleID}
            userEmail={user.email}
            loggedInStatus={loggedInStatus}
            handleLogout={handleLogout}
            selectedIndex={selectedIndex}
            handleSelectedIndex={handleSelectedIndex}
          />
          <Routes>
            <Route
              path="/"
              element={(
                <Home loggedInStatus={loggedInStatus} userRoleID={userRoleID} />
              )}
            />
            <Route
              path="/expenses/*"
              element={(
                <Expenses
                  token={token}
                  handleSelectedIndex={handleSelectedIndex}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route element={<ProtectedRoute isAllowed={userRoleID !== 1} />}>
              <Route
                path="/dashboard"
                element={(
                  <Dashboard
                    token={token}
                    handleSelectedIndex={handleSelectedIndex}
                    handleLogout={handleLogout}
                  />
                )}
              />
              <Route
                path="/revenues/*"
                element={(
                  <Revenues
                    token={token}
                    handleSelectedIndex={handleSelectedIndex}
                    handleLogout={handleLogout}
                  />
                )}
              />
              <Route
                path="/accounts/*"
                element={(
                  <Accounts
                    token={token}
                    handleSelectedIndex={handleSelectedIndex}
                    handleLogout={handleLogout}
                  />
                )}
              />
              <Route
                path="/expense_categories/*"
                element={<ExpenseCategories token={token} handleLogout={handleLogout} />}
              />
              <Route
                path="/revenue_categories/*"
                element={<RevenueCategories token={token} handleLogout={handleLogout} />}
              />
              <Route
                path="/registration"
                element={<Registration loggedInStatus={loggedInStatus} />}
              />
            </Route>
            {/* ProtectedRoute won't work for User.js */}
            {/* <User /> const { id } = useParams() gives blank id */}
            {/* <Route element={<ProtectedRoute isAllowed={userRoleID === 3} />}> */}
            {userRoleID === 3 && (
              <Route
                path="/users/*"
                element={(
                  <Users
                    token={token}
                    handleSelectedIndex={handleSelectedIndex}
                    handleLogout={handleLogout}
                  />
                  )}
              />
            )}
          </Routes>
        </>
      )}
    </ConfirmProvider>
  );
};

export default App;
