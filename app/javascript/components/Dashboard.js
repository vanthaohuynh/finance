import React from 'react';
import PropTypes from 'prop-types';
import { Card, Box, Grid } from '@mui/material';
import ExpenseChart from './home/ExpenseChart';
import RevenueChart from './home/RevenueChart';

const Dashboard = (props) => {
  const { loggedInStatus } = props;
  return (
    <>
      <h1>Dashboard</h1>
      <h3>
        Status:
        {loggedInStatus}
      </h3>
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

Dashboard.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
};

export default Dashboard;
