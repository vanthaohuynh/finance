import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import Stack from '@mui/material/Stack';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header';
import TransactionList from './TransactionList';
import AccountSummaryCard from './AccountSummaryCard';
import TransactionExpenseChart from './TransactionExpenseChart';
import TransactionRevenueChart from './TransactionRevenueChart';
import { info, success } from '../../helpers/notifications';
import { formatDate, handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const urlValidation = '/validate_token';

const Transactions = ({ token }) => {
  const { id } = useParams();
  const [account, setAccount] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const dataFetchedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const confirm = useConfirm();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const createTransactions = (account) => {
    // console.log('CreateTransactions:', account);
    let transactionID = 0;
    transactions.length = 0;
    const { account_num } = account;
    if (account.expenses.length > 0) {
      account.expenses.forEach((expense) => {
        const transaction = {
          id: transactionID += 1,
          account_num,
          invoice_date: expense.invoice_date,
          invoice_num: expense.invoice_num,
          transaction_type: 'Expense',
          category: expense.expense_category_name,
          amount: (expense.amount) * -1,
        };
        transactions.push(transaction);
      });
    }
    if (account.revenues.length > 0) {
      account.revenues.forEach((revenue) => {
        const transaction = {
          id: transactionID += 1,
          account_num,
          invoice_date: revenue.invoice_date,
          invoice_num: revenue.invoice_num,
          transaction_type: 'Revenue',
          category: revenue.revenue_category_name,
          amount: revenue.amount,
        };
        transactions.push(transaction);
      });
    }
    console.log('createTransaction', transactions);
    setTransactions(transactions);
    setFilteredTransactions(transactions);
  };

  const fetchAccount = async () => {
    try {
      const { data: selectedAccount, status } = await axios.get(`/api/v1/accounts/${id}`);
      if (status === 200) {
        setAccount(selectedAccount);
        createTransactions(selectedAccount);
        setLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(urlValidation);
      if (response.status === 200) {
        fetchAccount();
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      validateToken();
    }
  }, []);

  const handleDateFilter = () => {
    if (dateFrom && dateTo) {
      // console.log('Transactions:', transactions, dateFrom, dateTo);
      const newFilteredTransactions = transactions.filter((transaction) => {
        const transactionDate = formatDate(new Date(transaction.invoice_date.replace(/-/g, '\/')));
        // console.log('TransactionDate:', transactionDate);
        return transactionDate >= dateFrom && transactionDate <= dateTo;
      });
      // console.log('handleDateFilter', filteredTransactions);
      setFilteredTransactions(newFilteredTransactions);
    }
  };

  const handleDateFromInputChange = (val) => {
    if (val === 'Invalid Date') {
      return;
    }
    if (val !== null) {
      setDateFrom(formatDate(val));
    }
  };

  const handleDateToInputChange = (val) => {
    if (val === 'Invalid Date') {
      return;
    }
    if (val !== null) {
      setDateTo(formatDate(val));
    }
  };

  return (
    <section>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="gridTransactionHeader">
          <Typography className="transactionHeaderAccount" variant="h5" component="div">
            {account.account_num} - {account.study_title}
          </Typography>
          <Typography className="transactionHeaderLabel" variant="body1" component="div" align="right">
            Period:
          </Typography>
          <div className="transactionHeaderDateFrom">
            <DatePicker
              type="text"
              id="dateFrom"
              name="dateFrom"
              label="From"
              inputFormat="yyyy-MM-dd"
              onChange={handleDateFromInputChange}
              value={dateFrom}
              renderInput={
                (params) => <TextField size="small" fullWidth {...params} />
              }
            />
          </div>
          <div className="transactionHeaderDateTo">
            <DatePicker
              type="text"
              id="dateTo"
              name="dateTo"
              label="To"
              inputFormat="yyyy-MM-dd"
              onChange={handleDateToInputChange}
              value={dateTo}
              renderInput={
                (params) => <TextField size="small" fullWidth {...params} />
              }
            />
          </div>
          <Button
            sx={{
              width: 100,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            onClick={handleDateFilter}
          >
            Go
          </Button>
          <Button
            sx={{
              width: 150,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            // onClick={}
          >
            Export PDF
          </Button>
        </div>

        <div className="gridTransactions">
          {/* {isError && <p>{error.message}</p>} */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* <ErrorBoundary>
                <AccountList accounts={accounts} />
              </ErrorBoundary> */}
              {/* <div className="transactionHeader"> */}
              <div className="transactionMenu">
                <AccountSummaryCard />
                <AccountSummaryCard />
              </div>
              <div className="transactionChart">
                <div>
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
                          <TransactionRevenueChart />
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card
                          size="small"
                          sx={{ width: '100%', height: '100%' }}
                        >
                          <TransactionExpenseChart />
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
                <div className="transactionList">
                  <TransactionList transactions={filteredTransactions} />
                </div>
              </div>
              <Routes>
                {/* <Route
                  path="/"
                  element={(
                    <TransactionList
                      account={account}
                    />
                  )}
                /> */}
                {/*
                <Route
                  path=":id"
                  element={(
                    <ErrorBoundary>
                      <Account
                        token={token}
                        accounts={accounts}
                        onDelete={deleteAccount}
                      />
                    </ErrorBoundary>
                  )}
                />
                <Route
                  path=":id/edit"
                  element={(
                    <ErrorBoundary>
                      <AccountForm
                        accounts={accounts}
                        onSave={updateAccount}
                      />
                    </ErrorBoundary>
                    )}
                />
                <Route
                  path="new"
                  element={(
                    <ErrorBoundary>
                      <AccountForm onSave={addAccount} />
                    </ErrorBoundary>
                )}
                /> */}
              </Routes>
            </>
          )}
        </div>
      </LocalizationProvider>
    </section>
  );
};

Transactions.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Transactions;
