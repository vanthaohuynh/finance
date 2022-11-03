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
import { handleAjaxError } from '../helpers/helpers';
import './App.css';
import ExpenseCategories from './categories/expense/ExpenseCategories';
import RevenueCategories from './categories/revenue/RevenueCategories';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
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

  // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // if (user && token) {
  //   axios.get(url)
  //     .then((response) => {
  //       console.log('App: useEffect: response: ', response);
  //       if (response.status === 200) {
  //         console.log('App: useEffect: response.data: ', response.data);
  //         setLoggedInStatus('LOGGED_IN');
  //         setUser(response.data.user);
  //         setToken(response.data.token);
  //         // navigate('/dashboard');
  //       } else {
  //         setLoggedInStatus('NOT_LOGGED_IN');
  //         setUser({});
  //         setToken('');
  //         // navigate('/');
  //       }
  //     })
  //     .catch((error) => {
  //       handleAjaxError(error);
  //     });
  // } else {
  //   setLoggedInStatus('NOT_LOGGED_IN');
  //   setUser({});
  //   setToken('');
  //   // navigate('/');
  // }
  // }, []);

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

  // useEffect(() => {
  //   if (user && token) {
  //     console.log('App: useEffect: user and token ', user, token);
  //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  //     // axios.defaults.headers.common['Content-Type'] = 'application/json';
  //     // axios.defaults.headers.common.Accept = 'application/json';
  //     const checkLoginStatus = async () => {
  //       try {
  //         const response = await axios.get(url);
  //         console.log('App: useEffect: checkLoginStatus: response: ', response);
  //         if (response.status === 200) {
  //           // setLoggedInStatus('LOGGED_IN');
  //           // setUser(response.data.user);
  //           // setToken(response.data.token);
  //         } else {
  //           // setLoggedInStatus('NOT_LOGGED_IN');
  //           // setUser({});
  //           // setToken('');
  //         }
  //       } catch (error) {
  //         // No need to do anything because this is just an initial check
  //         // handleAjaxError(error);
  //       }
  //       //  catch (err) {
  //       //   handleAjaxError(err);
  //       //   setLoggedInStatus('NOT_LOGGED_IN');
  //       //   setUser({});
  //       //   setToken('');
  //       // }
  //     };
  //     // checkLoginStatus();
  //   }
  // }, []);

    //   try {
    //   //   axios.get('/validate_token')
    //   //     .then((response) => {
    //   //       console.log('App: useEffect: response: ', response);
    //   //       if (response.data.status === 'verified') {
    //   //         setLoggedInStatus('LOGGED_IN');
    //   //         setUser(response.data.user);
    //   //         setToken(response.data.token);
    //   //       } else {
    //   //         setLoggedInStatus('NOT_LOGGED_IN');
    //   //         setUser({});
    //   //         setToken('');
    //   //       }
    //   //     })
    //   //     .catch((error) => {
    //   //       console.log('App: useEffect: error: ', error);
    //   //       handleAjaxError(error);
    //   //     });
    //   // } catch (error) {
    //   //   console.log('App: useEffect: error: ', error);
    //   //   handleAjaxError(error);
    //   // }
    // }
  // }, [user, token]);

  // useEffect(() => {
    // const token = window.localStorage.getItem('token');
    // const user = window.localStorage.getItem('user');
    // console.log('App: useEffect: token: ', token);
    // console.log('App: useEffect: user: ', user);
    // if (token && user) {
    //   console.log('App: useEffect: token and user: ', token, user);
    //   const checkLoginStatus = async () => {
    //     const url = 'http://localhost:3000/auto_login';
    //     const headers = {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     };
    //     console.log('App: useEffect: checkLoginStatus: headers: ', headers);
    //     try {
    //       const response = await axios.get(url, { headers });
    //       console.log('App: checkLoginStatus: response: ', response);
    //       if (response.status === 200) {
    //         handleLogin(response.data);
    //       } else {
    //         console.log('RemoveItem localStorage');
    //         window.localStorage.removeItem('token');
    //         window.localStorage.removeItem('user');
    //         handleLogout();
    //       }
    //     } catch (err) {
    //       handleAjaxError(err);
    //     }
    //   };
    //   checkLoginStatus();
    // }
  // }, []);

  // Using cookies
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/logged_in', { withCredentials: true });
  //       // console.log('App: checkLoginStatus: response: ', response);
  //       if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
  //         setLoggedInStatus('LOGGED_IN');
  //         setUser(response.data.user);
  //       } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
  //         setLoggedInStatus('NOT_LOGGED_IN');
  //         setUser({});
  //       }
  //     } catch (error) {
  //       handleAjaxError(error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, [loggedInStatus]);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/auto_login', { withCredentials: true });
  //       if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
  //         setLoggedInStatus('LOGGED_IN');
  //         setUser(response.data.user);
  //       } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
  //         setLoggedInStatus('NOT_LOGGED_IN');
  //         setUser({});
  //       }
  //     } catch (error) {
  //       handleAjaxError(error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, [loggedInStatus]);

      // console.log('App: checkLoginStatus: response: ', response);

      // axios
      //   .get('http://localhost:3000/auto_login')
      //   .then((response) => {
      //     console.log('App: checkLoginStatus: response: ', response);
      //     if (
      //       response.data.status === '200'
      //       && loggedInStatus === 'NOT_LOGGED_IN'
      //     ) {
      //       setLoggedInStatus('LOGGED_IN');
      //       setUser(response.data.user);
      //       // console.log('App: checkLoginStatus: user: ', user);
      //     } else if (
      //       !response.data.logged_in
      //       && loggedInStatus === 'LOGGED_IN'
      //     ) {
      //       setLoggedInStatus('NOT_LOGGED_IN');
      //       setUser({});
      //       // console.log('App: checkLoginStatus:', loggedInStatus);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('App: checkLoginStatus: error: ', error);
      //     handleAjaxError(error);
      //   });
    // };
  //   checkLoginStatus();
  //   console.log('App: useEffect: checkLoginStatus: ', loggedInStatus);
  //   // console.log('App: useEffect: checkLoginStatus: user: ', user);
  // }, [loggedInStatus]);

  // const handleLogoutClick = () => {
  //   axios
  //     .delete('http://localhost:3000/logout', { withCredentials: true })
  //     .then((response) => {
  //       console.log('Home: handleLogoutClick: response: ', response);
  //       handleLogout();
  //       navigate('/');
  //       // redirect('/');
  //     })
  //     .catch((error) => {
  //       console.log('Home: handleLogoutClick: error: ', error);
  //       handleAjaxError(error);
  //     });
  // };

  return (
    <ConfirmProvider>
      {loggedInStatus === 'LOGGED_IN' ? (
        <MainAppBar
          userRoleID={user.role_id}
          userEmail={user.email}
          loggedInStatus={loggedInStatus}
          handleLogout={handleLogout}
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
            element={<Dashboard />}
          />
          {/* <Route
            path="/registration"
            element={<Registration loggedInStatus={loggedInStatus} />}
          /> */}
          <Route
            path="/expenses/*"
            element={<Expenses token={token} />}
          />
          <Route
            path="/revenues/*"
            element={<Revenues token={token} />}
          />
          <Route
            path="/accounts/*"
            element={<Accounts token={token} />}
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
