import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { Card, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header';
import TransactionList from './TransactionList';
import AccountSummaryCard from './AccountSummaryCard';
import TransactionExpenseChart from './TransactionExpenseChart';
import TransactionRevenueChart from './TransactionRevenueChart';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const urlValidation = '/validate_token';
// const apiTransactionEndpoint = '/api/v1/transactions';
// const apiTransactionEndpoint = '/api/v1/accounts/transactions';

const Transactions = ({ token }) => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const confirm = useConfirm();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/v1/accounts/${id}/transactions`);
      if (response.status === 200) {
        setTransactions(response.data);
        setLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(urlValidation);
        if (response.status === 200) {
          fetchTransactions();
          console.log('Transactions:', transactions);
        }
      } catch (err) {
        handleAjaxError(err);
      }
    };
    validateToken();
  }, []);

  return (
    <>
      {/* <Header header="Transactions" /> */}
      <div className="gridTransactions">
        {/* {isError && <p>{error.message}</p>} */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* <ErrorBoundary>
              <AccountList accounts={accounts} />
            </ErrorBoundary> */}
            <div className="transactionHeader">
              Transaction Header
            </div>
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
                <TransactionList account={transactions} />
              </div>
            </div>
            <Routes>
              {/* <Route
                path="/"
                element={(
                  <TransactionList
                    transactions={transactions}
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
    </>
  );
};

Transactions.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Transactions;
