import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Box, Grid } from '@mui/material';
import ExpenseChart from './home/ExpenseChart';
import RevenueChart from './home/RevenueChart';

const Dashboard = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    const user = window.localStorage.getItem('user');
    if (token && user) {
      setLoggedInStatus('LOGGED_IN');
      setUser(JSON.parse(user));
    } else {
      setLoggedInStatus('NOT_LOGGED_IN');
      setUser({});
    }
  }, []);

  // const { loggedInStatus } = props;
  // console.log('Dashboard: loggedInStatus: ', loggedInStatus);
  // console.log('Dashboard: ', loggedInStatus);
  // console.log('Dashboard: ', window.localStorage.getItem('user'));
  // console.log('Dashboard: ', window.localStorage.getItem('jwt'));
  return (
    <>
      {/* <h1>Dashboard</h1>
      <h3>
        Status:
        {loggedInStatus}
      </h3> */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card
              size="small"
              sx={{ width: '100%', height: '100%' }}
            >
              <RevenueChart />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              size="small"
              sx={{ width: '100%', height: '100%' }}
            >
              <ExpenseChart />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
