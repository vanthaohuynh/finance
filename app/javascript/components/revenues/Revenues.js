import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header';
import RevenueList from './RevenueList';
import Revenue from './Revenue';
import RevenueForm from './RevenueForm';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const Revenues = ({ token }) => {
  const [revenues, setRevenues] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [revenueCategories, setRevenueCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const apiRevenueEndpoint = '/api/v1/revenues';
  const apiAccountEndpoint = '/api/v1/accounts2';
  const apiRevenueCatEndpoint = '/api/v1/revenue_categories';
  const apiTransactionEndpoint = '/api/v1/transactions';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get(apiRevenueEndpoint);
      if (response.status === 200) {
        setRevenues(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      handleAjaxError(error);
    }
    setIsLoading(false);
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(apiAccountEndpoint);
      if (response.status === 200) {
        setAccounts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      handleAjaxError(error);
    }
    setIsLoading(false);
  };

  const fetchRevenueCategoryData = async () => {
    try {
      const response = await axios.get(apiRevenueCatEndpoint);
      if (response.status === 200) {
        setRevenueCategories(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      handleAjaxError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(urlValidation);
        if (response.status === 200) {
          setIsValidated(true);
          fetchRevenueData();
          fetchAccountData();
          fetchRevenueCategoryData();
        } else {
          setIsValidated(false);
          throw Error(response.statusText);
          // navigate('/login');
        }
      } catch (err) {
        handleAjaxError(err);
        isValidated(false);
      }
    };
    validateToken();
  }, []); // Need to keep this dependencies array empty

  const reloadRevenueData = async () => {
    try {
      const response = await axios.get(apiRevenueEndpoint);
      if (response.status === 200) {
        setRevenues(response.data);
        setIsLoading(false);
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      handleAjaxError(err);
    }
    setIsLoading(false);
  };

  const addTransaction = async (savedRevenue) => {
    const transaction = {
      account_id: savedRevenue.account_id,
      account_num: savedRevenue.account_num,
      invoice_num: savedRevenue.invoice_num,
      invoice_date: savedRevenue.invoice_date,
      transaction_type: 'Revenue',
      transaction_category: savedRevenue.revenue_category_name,
      transaction_amount: savedRevenue.amount,
      transaction_currency: savedRevenue.revenue_currency
    };

    try {
      const response = await axios.post(apiTransactionEndpoint, transaction);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedTransaction = response.data;
      const newTransactions = [...transactions, savedTransaction];
      setTransactions(newTransactions);
      success('Transaction added successfully');
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addRevenue = async (newRevenue) => {
    try {
      const response = await axios.post(apiRevenueEndpoint, newRevenue);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedRevenue = response.data;
      const newRevenues = [...revenues, savedRevenue];
      setRevenues(newRevenues);
      reloadRevenueData();

      addTransaction(savedRevenue);

      success('Revenue Added!');
      navigate(`/revenues/${savedRevenue.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteRevenue = async (revenueId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this revenue?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiRevenueEndpoint}/${revenueId}`);
          if (response.status !== 204) {
            throw Error(response.statusText);
          }
          const newRevenues = revenues.filter((revenue) => revenue.id !== revenueId);
          setRevenues(newRevenues);
          success('Revenue Deleted!');
          navigate('/revenues');
        } catch (err) {
          handleAjaxError(err);
          // To be implemented: Using ErrorBoundary
          // setError(err);
          // setIsError(true);
          // console.error(Error(err.message ? err.message : err));
        }
      })
      .catch(() => {
        info('Delete cancelled');
      });
  };

  // const deleteRevenue = async (revenueId) => {
  //   confirm({
  //     title: 'Confirmation',
  //     description: 'Are you sure you want to delete this revenue?',
  //   })
  //     .then(async () => {
  //       try {
  //         const response = await axios.delete(`${apiRevenueEndpoint}/${revenueId}`);
  //         console.log('Success:', response);
  //         success('Revenue Deleted!');
  //         navigate('/revenues');
  //         setRevenues(revenues.filter(revenue => revenue.id !== revenueId));
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
  //     const response = await window.fetch(`/api/v1/revenues/${revenueId}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) throw Error(response.statusText);

  //     // window.alert('Revenue Deleted!');
  //     success('Revenue Deleted!');
  //     navigate('/revenues');
  //     setRevenues(revenues.filter(revenue => revenue.id !== revenueId));
  //   } catch (error) {
  //     handleAjaxError(error);
  //   }
  // }
  // };

  const updateRevenue = async (updatedRevenue) => {
    try {
      const response = await axios.patch(`${apiRevenueEndpoint}/${updatedRevenue.id}`, updatedRevenue);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newRevenues = revenues;
      const idx = newRevenues.findIndex((revenue) => revenue.id === updatedRevenue.id);
      newRevenues[idx] = updatedRevenue;
      setRevenues(newRevenues);
      reloadRevenueData();
      success('Revenue Updated!');
      navigate(`/revenues/${updatedRevenue.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      {/* <Header header="Revenues" /> */}
      <div className="grid">
        {/* {isError && <p>{error.message}</p>} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ErrorBoundary>
              <RevenueList revenues={revenues} />
            </ErrorBoundary>
            <Routes>
              <Route
                path=":id"
                element={(
                  <ErrorBoundary>
                    <Revenue
                      revenues={revenues}
                      accounts={accounts}
                      revenueCategories={revenueCategories}
                      onDelete={deleteRevenue}
                    />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <RevenueForm
                      revenues={revenues}
                      accounts={accounts}
                      revenueCategories={revenueCategories}
                      onSave={updateRevenue}
                    />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <RevenueForm
                      // For new revenue, do not pass revenues
                      // in order to setup initial state
                      // revenues={revenues}
                      accounts={accounts}
                      revenueCategories={revenueCategories}
                      onSave={addRevenue}
                    />
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

Revenues.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Revenues;
