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
// import AccountAmendmentList from './AccountAmendmentList';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';
// import TransactionList from './TransactionList';

const urlValidation = '/validate_token';
const apiAccountEndpoint = '/api/v1/accounts';
// const apiTransactionEndpoint = '/api/v1/accounts/transactions';

const Accounts = ({ token }) => {
  const [accounts, setAccounts] = useState([]);
  const dataferchedRef = useRef(false);
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
    if (!dataferchedRef.current) {
      dataferchedRef.current = true;
      validateToken();
    }
  }, []);
  // Working fine with old Session Cookies
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await window.fetch('/api/v1/accounts');
  //       if (!response.ok) throw Error(response.statusText);
  //       const data = await response.json();
  //       setAccounts(data);
  //     } catch (err) {
  //       handleAjaxError(err);
  //     }

  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await window.fetch('/api/v1/account_amendments');
  //       if (!response.ok) throw Error(response.statusText);
  //       const data = await response.json();
  //       setAmendments(data);
  //     } catch (err) {
  //       handleAjaxError(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const getAmendments = (id) => {
  //   const amendments = accountAmendments.filter((e) => e.account_id === Number(id));
  //   return amendments;
  // };

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

  // const addAccount = async (newAccount) => {
  //   try {
  //     const response = await window.fetch('/api/v1/accounts', {
  //       method: 'POST',
  //       body: JSON.stringify(newAccount),
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (!response.ok) throw Error(response.statusText);

  //     const savedAccount = await response.json();
  //     const newAccounts = [...accounts, savedAccount];
  //     setAccounts(newAccounts);
  //     // window.alert('Account Added!');
  //     success('Account Added!');
  //     navigate(`/accounts/${savedAccount.id}`);
  //   } catch (err) {
  //     console.log('addAccount: err: ', err);
  //     handleAjaxError(err);
  //   }
  // };

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

  // const deleteAccount = async (accountId) => {
  //   confirm({
  //     title: 'Confirmation',
  //     description: 'Are you sure you want to delete this account?',
  //   })
  //     .then(async () => {
  //       try {
  //         const response = await window.fetch(`/api/v1/accounts/${accountId}`, {
  //           method: 'DELETE',
  //         });

  //         if (!response.ok) throw Error(response.statusText);

  //         // window.alert('Account Deleted!');
  //         success('Account Deleted!');
  //         navigate('/accounts');
  //         setAccounts(accounts.filter((account) => account.id !== accountId));
  //       } catch (err) {
  //         handleAjaxError(err);
  //         // To be implemented: Using ErrorBoundary
  //         // setError(err);
  //         // setIsError(true);
  //         // console.error(Error(err.message ? err.message : err));
  //       }
  //     })
  //     .catch(() => {
  //       info('Delete cancelled');
  //     });
  // };

  // const deleteAccount = async (accountId) => {
  //   confirm({
  //     title: 'Confirmation',
  //     description: 'Are you sure you want to delete this account?',
  //   })
  //     .then(async () => {
  //       try {
  //         const response = await axios.delete(`${apiAccountEndpoint}/${accountId}`);
  //         console.log('Success:', response);
  //         success('Account Deleted!');
  //         navigate('/accounts');
  //         setAccounts(accounts.filter(account => account.id !== accountId));
  //       } catch (error) {
  //         if (error.response) {
  //           // setIsServerSideError(true);
  //           // setServerErrors(error.response.data);
  //           // console.log('Error Response:', error.response.data);
  //           console.log('Error Response:', error.response);
  //         } else if (error.request) {
  //           console.log('Error Request', error.request);
  //         } else {
  //           console.log('Error', error.message);
  //         }
  //         console.log('Server Errors:', error);
  //       }
  //     });
  // };

  // Original codes from James Hibbard
  // const sure = window.confirm('Are you sure?');
  // if (sure) {
  //   try {
  //     const response = await window.fetch(`/api/v1/accounts/${accountId}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) throw Error(response.statusText);

  //     // window.alert('Account Deleted!');
  //     success('Account Deleted!');
  //     navigate('/accounts');
  //     setAccounts(accounts.filter(account => account.id !== accountId));
  //   } catch (error) {
  //     handleAjaxError(error);
  //   }
  // }
  // };

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
    <>
      {/* <Header header="Accounts" /> */}
      <div className="grid">
        {/* {isError && <p>{error.message}</p>} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* <ErrorBoundary>
              <AccountList accounts={accounts} />
            </ErrorBoundary> */}
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
                      // amendments={amendments}
                      onDelete={deleteAccount}
                    />
                    {/* <AccountAmendmentList
                      accountAmendments={getAmendments({ id })}
                    /> */}
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <AccountForm
                      accounts={accounts}
                      // accountAmendments={accountAmendments}
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
          </>
        )}
      </div>
    </>
  );
};

Accounts.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Accounts;
