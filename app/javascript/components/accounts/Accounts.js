import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header';
import Account from './Account';
import AccountForm from './AccountForm';
import AccountList from './AccountList';
import Transactions from './Transactions';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const urlValidation = '/validate_token';
const apiAccountEndpoint = '/api/v1/accounts';

const Accounts = ({ token, handleSelectedIndex }) => {
  const [accounts, setAccounts] = useState([]);
  const dataFetchedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(apiAccountEndpoint);
      console.log('Accounts: fetchAccountData: response: ', response);
      if (response.status === 200) {
        setAccounts(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(urlValidation);
      if (response.status === 200) {
        setIsValidated(true);
        fetchAccountData();
        // fetchTransactionData();
      } else {
        setIsValidated(false);
        // navigate('/api/v1/expenses');
      }
    } catch (err) {
      handleAjaxError(err);
      setIsValidated(false);
      // navigate('/home');
    }
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      validateToken();
      handleSelectedIndex(0);
    }
  }, []);

  const addAccount = async (newAccount) => {
    try {
      const response = await axios.post(apiAccountEndpoint, newAccount);
      console.log('Accounts: addAccount: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedAccount = response.data;
      setAccounts([...accounts, savedAccount]);
      success('Account added successfully');
      navigate(`/accounts/${savedAccount.id}`);
    } catch (err) {
      handleAjaxError(err);
      console.log('Accounts: addAccount: err: ', err);
    }
  };

  const deleteAccount = async (accountId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this account?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiAccountEndpoint}/${accountId}`);
          console.log('Accounts: deleteAccount: response: ', response);
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          success('Account deleted successfully');
          setAccounts(accounts.filter((e) => e.id !== Number(accountId)));
          navigate('/accounts');
        } catch (err) {
          handleAjaxError(err);
          console.log('Accounts: deleteAccount: err: ', err);
        }
      })
      .catch(() => {
        info('Delete cancelled');
      });
  };

  const updateAccount = async (updatedAccount) => {
    try {
      const response = await axios.patch(`${apiAccountEndpoint}/${updatedAccount.id}`, updatedAccount);
      console.log('Accounts: updateAccount: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newAccounts = accounts;
      const idx = newAccounts.findIndex((account) => account.id === updatedAccount.id);
      newAccounts[idx] = updatedAccount;
      setAccounts(newAccounts);

      success('Account Updated!');
      navigate(`/accounts/${updatedAccount.id}`);
    } catch (err) {
      handleAjaxError(err);
      console.log('Accounts: updateAccount: err: ', err);
    }
  };

  return (
    <div className="grid">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route
            path=":id/transactions/*"
            element={(
              <ErrorBoundary>
                <Transactions token={token} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/"
            element={(
              <ErrorBoundary>
                <AccountList accounts={accounts} />
              </ErrorBoundary>
            )}
          />
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
          />
        </Routes>
      )}
    </div>
  );
};

Accounts.propTypes = {
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
};

export default Accounts;
