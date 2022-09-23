import React from 'react';
import ExpenseChart from './home/ExpenseChart';
import RevenueChart from './home/RevenueChart';
import { Card } from '@mui/material';
import { Box, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'background.paper' }}>
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
  );
}

export default Home;
