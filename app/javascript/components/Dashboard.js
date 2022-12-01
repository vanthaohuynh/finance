import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Billable from './home/Billable';
import Receivable from './home/Receivable';
import RevenuePastThreeYears from './home/RevenuePastThreeYears';
import RevenueCurrentYear from './home/RevenueCurrentYear';
import RevenueCurrentRiYear from './home/RevenueCurrentRiYear';
import ExpenseTransactions from './home/ExpenseTransactions';
import ExpenseCurrentYear from './home/ExpenseCurrentYear';
import { handleAjaxError } from '../helpers/helpers';

// import ExpenseChartDashboard from './home/ExpenseChartDashboard';
// import RevenueChartDashboard from './home/RevenueChartDashboard';

const urlValidation = '/validate_token';
const apiBillable = '/api/v1/billable';
const apiReceivable = '/api/v1/receivable';
const apiRevenuePast3years = '/api/v1/revenue_past3years';
const apiRevenueCurrentYear = '/api/v1/revenue_currentyear';
const apiRevenueCurrentRiYear = '/api/v1/revenue_current_ri_year';
const apiExpenseTransactions = '/api/v1/expense_transactions';
const apiExpenseCurrentYear = '/api/v1/expense_currentyear';

const apiRevenuePastYear = '/api/v1/revenue_pastyear';
const apiRevenuePastRiYear = '/api/v1/revenue_past_ri_year';

const Dashboard = ({ token, handleSelectedIndex }) => {
  // const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  // const [user, setUser] = useState({});
  const dataFetchedRef = useRef(false);
  const [billable, setBillable] = useState([]);
  const [receivable, setReceivable] = useState([]);
  const [revenuePast3years, setRevenuePast3years] = useState([]);
  const [revenueCurrentYear, setRevenueCurrentYear] = useState([]);
  const [revenueCurrentRiYear, setRevenueCurrentRiYear] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [expenseCurrentYear, setExpenseCurrentYear] = useState([]);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchBillable = async () => {
    try {
      const response = await axios.get(apiBillable);
      console.log('Dashboard fetchBillable: ', response);
      if (response.status === 200) {
        setBillable(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchReceivable = async () => {
    try {
      const response = await axios.get(apiReceivable);
      console.log('Dashboard fetchReceivable: ', response);
      if (response.status === 200) {
        setReceivable(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenuePast3Years = async () => {
    try {
      const response = await axios.get(apiRevenuePast3years);
      console.log('Dashboard fetchRevenuePast3Years: ', response);
      if (response.status === 200) {
        setRevenuePast3years(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueCurrentYear = async () => {
    try {
      const response = await axios.get(apiRevenueCurrentYear);
      console.log('Dashboard apiRevenueCurrentYear: ', response);
      if (response.status === 200) {
        setRevenueCurrentYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueCurrentRiYear = async () => {
    try {
      const response = await axios.get(apiRevenueCurrentRiYear);
      console.log('Dashboard apiRevenueCurrentRiYear: ', response);
      if (response.status === 200) {
        setRevenueCurrentRiYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseTransactions = async () => {
    try {
      const response = await axios.get(apiExpenseTransactions);
      console.log('Dashboard ExpenseTransactions: ', response);
      if (response.status === 200) {
        setExpenseTransactions(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseCurrentYear = async () => {
    try {
      const response = await axios.get(apiExpenseCurrentYear);
      console.log('Dashboard apiExpenseCurrentYear: ', response);
      if (response.status === 200) {
        setExpenseCurrentYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(urlValidation);
      if (response.status === 200) {
        fetchBillable();
        fetchReceivable();
        fetchRevenuePast3Years();
        fetchRevenueCurrentYear();
        fetchRevenueCurrentRiYear();
        fetchExpenseTransactions();
        fetchExpenseCurrentYear();
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      validateToken();
      handleSelectedIndex(-1);
    }
  }, []);

  return (
    <section>
      {/* <div className="gridTest">
        <Paper elevation={3}>
          <Billable billable={billable} />
        </Paper>
      </div> */}
      <div className="gridDashboard">
        <Paper elevation={3}>
          <Billable billable={billable} />
        </Paper>
        <Paper elevation={3}>
          <Receivable receivable={receivable} />
        </Paper>
        <Paper elevation={3}>
          <RevenuePastThreeYears revenuePast3years={revenuePast3years} />
        </Paper>
        <Paper elevation={3}>
          <RevenueCurrentYear revenueCurrentYear={revenueCurrentYear} />
        </Paper>
        <Paper elevation={3}>
          <RevenueCurrentRiYear revenueCurrentRiYear={revenueCurrentRiYear} />
        </Paper>
      </div>
      <div className="gridDashboard">
        <Paper elevation={3}>
          <ExpenseTransactions expenseTransactions={expenseTransactions} />
        </Paper>
        <Paper elevation={3}>
          <ExpenseCurrentYear expenseCurrentYear={expenseCurrentYear} />
        </Paper>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
};

export default Dashboard;

      {/* <Box sx={{
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
              <RevenueChartDashboard />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              size="small"
              sx={{ width: '100%', height: '100%' }}
            >
              <ExpenseChartDashboard />
            </Card>
          </Grid>
        </Grid>
      </Box> */}
