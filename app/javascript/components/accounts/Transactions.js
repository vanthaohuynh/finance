import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  useNavigate,
  useParams,
  Link,
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
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Header from '../Header';
import RevenueTransactionList from './RevenueTransactionList';
import ExpenseTransactionList from './ExpenseTransactionList';
import AccountSummaryTable from './AccountSummaryTable';
import RevenueCalendarYearTable from './RevenueCalendarYearTable';
import RevenueRIYearTable from './RevenueRIYearTable';
import ExpenseChart from './ExpenseChart';
import RevenueChart from './RevenueChart';
import { info, success } from '../../helpers/notifications';
import { formatDate, handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const urlValidation = '/validate_token';

const Transactions = ({ token, handleLogout }) => {
  const { id } = useParams();
  const [account, setAccount] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [chartTransactionData, setChartTransactionData] = useState([]);
  const [cardTransactionData, setCardTransactionData] = useState([]);
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
          payment_date: expense.payment_date,
          invoice_num: expense.invoice_num,
          invoice_id: expense.id,
          transaction_type: 'Expense',
          category: expense.expense_category_name,
          expense_sub_category_name: expense.expense_sub_category_name,
          expense_code: expense.expense_sub_category_code,
          amount: (expense.amount),
          supplier: expense.supplier,
          // amount: (expense.amount) * -1,
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
          deposit_date: revenue.deposit_date,
          invoice_num: revenue.invoice_num,
          invoice_id: revenue.id,
          transaction_type: 'Revenue',
          category: revenue.revenue_category_name,
          amount: revenue.amount,
          overhead: revenue.overhead,
          after_overhead: revenue.after_overhead,
        };
        transactions.push(transaction);
      });
    }
    console.log('createTransaction', transactions);
    setTransactions(transactions);
    setFilteredTransactions(transactions);
    setChartTransactionData(transactions);
    setCardTransactionData(transactions);
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
      handleLogout();
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
      setChartTransactionData(newFilteredTransactions);
      // createSummaryCardData(newFilteredTransactions);
      setCardTransactionData(newFilteredTransactions);
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
        <div className="gridItem">
          <div className="gridTransactionHeader">
            <Typography className="transactionHeaderAccount" variant="h5" component="div">
              {account.account_num} - {account.study_name}
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
                backgroundColor: 'white',
              }}
              variant="outlined"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleDateFilter}
            >
              Go
            </Button>
            <Button
              sx={{
                width: 200,
                height: 40,
                backgroundColor: 'white',
              }}
              variant="outlined"
              color="primary"
              startIcon={<SettingsIcon />}
              component={Link}
              to={`/accounts/${id}`}
            >
              Account Settings
            </Button>
          </div>

          <div className="gridAccountSummary">
            <AccountSummaryTable cardTransactionData={cardTransactionData} />
            <RevenueCalendarYearTable transactions={transactions} />
            <RevenueRIYearTable transactions={transactions} />
          </div>

          <div className="gridTransactions">
            {/* {isError && <p>{error.message}</p>} */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* <div className="transactionCard">
                  <AccountSummaryCard cardTransactionData={cardTransactionData} />
                </div> */}
                <div className="revenueTransactions">
                  <Paper
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        overflow: 'hidden',
                        backgroundColor: 'background.paper',
                        // backgroundColor: 'ECF0F1',
                        // padding: 1,
                      }}
                    >
                      <Grid
                        // sx={{
                        //   backgroundColor: 'ECF0F1',
                        // }}
                        container
                        spacing={2}
                      >
                        <Grid item xs={6} md={5}>
                          <Card
                            size="small"
                            sx={{ width: '100%', height: '100%' }}
                          >
                            <RevenueChart
                              chartTransactionData={chartTransactionData}
                            />
                          </Card>
                        </Grid>
                        <Grid item xs={6} md={7}>
                          <div className="transactionList">
                            <RevenueTransactionList transactions={filteredTransactions} />
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </div>

                <div className="expenseTransactions">
                  <Paper
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        overflow: 'hidden',
                        backgroundColor: 'background.paper',
                        // backgroundColor: 'ECF0F1',
                        // padding: 1,
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                      >
                        <Grid item xs={6} md={5}>
                          <Card
                            size="small"
                            sx={{ width: '100%', height: '100%' }}
                          >
                            <ExpenseChart
                              chartTransactionData={chartTransactionData}
                            />
                          </Card>
                        </Grid>
                        <Grid item xs={6} md={7}>
                          <div className="transactionList">
                            <ExpenseTransactionList transactions={filteredTransactions} />
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </div>
              </>
            )}
          </div>
        </div>
      </LocalizationProvider>
    </section>
  );
};

Transactions.propTypes = {
  token: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Transactions;
