import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header';
import ExpenseList from './ExpenseList';
import Expense from './Expense';
import ExpenseForm from './ExpenseForm';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const Expenses = ({ userRoleID, token, handleSelectedIndex, handleLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  // const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const apiExpenseEndpoint = '/api/v1/expenses';
  const apiAccountEndpoint = '/api/v1/accounts2';
  const apiExpenseCatEndpoint = '/api/v1/expense_categories';
  // const apiTransactionEndpoint = '/api/v1/transactions';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(apiExpenseEndpoint);
      console.log('Expenses: fetchExpenseData: response: ', response);
      if (response.status === 200) {
        setExpenses(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
      // navigate('/dashboard');
    }
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(apiAccountEndpoint);
      console.log('Expenses: fetchAccountData: response: ', response);
      if (response.status === 200) {
        setAccounts(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseCategoryData = async () => {
    try {
      const response = await axios.get(apiExpenseCatEndpoint);
      console.log('Expenses: fetchExpenseCategoryData: response: ', response);
      if (response.status === 200) {
        setExpenseCategories(response.data);
        setIsLoading(false);
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
          setIsValidated(true);
          fetchExpenseData();
          fetchAccountData();
          fetchExpenseCategoryData();
        } else {
          setIsValidated(false);
        }
      } catch (err) {
        handleAjaxError(err);
        setIsValidated(false);
        handleLogout();
      }
    };
    validateToken();
    handleSelectedIndex(2);
  }, []); // Need to keep this empty

  // useEffect(() => {
  //   const fetchExpenseData = async () => {
  //     try {
  //       const response = await window.fetch(apiExpenseEndpoint);
  //       if (!response.ok) throw Error(response.statusText);
  //       const data = await response.json();
  //       setExpenses(data);
  //     } catch (err) {
  //       handleAjaxError(err);
  //     }

  //     setIsLoading(false);
  //   };
  //   fetchExpenseData();

  //   const fetchAccountData = async () => {
  //     try {
  //       const response = await window.fetch(apiAccountEndpoint);
  //       if (!response.ok) throw Error(response.statusText);
  //       const data = await response.json();
  //       setAccounts(data);
  //     } catch (err) {
  //       handleAjaxError(err);
  //     }

  //     setIsLoading(false);
  //   };
  //   fetchAccountData();

  //   const fetchExpenseCategoryData = async () => {
  //     try {
  //       const response = await window.fetch(apiExpenseCatEndpoint);
  //       if (!response.ok) throw Error(response.statusText);
  //       const data = await response.json();
  //       setExpenseCategories(data);
  //     } catch (err) {
  //       handleAjaxError(err);
  //     }

  //     setIsLoading(false);
  //   };
  //   fetchExpenseCategoryData();
  // }, []);

  const reloadExpenseData = async () => {
    try {
      const response = await axios.get(apiExpenseEndpoint);
      console.log('Expenses: reloadExpenseData: response: ', response);
      if (response.status === 200) {
        setExpenses(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  // const addTransaction = async (savedExpense) => {
  //   const transaction = {
  //     account_id: savedExpense.account_id,
  //     account_num: savedExpense.account_num,
  //     invoice_num: savedExpense.invoice_num,
  //     invoice_date: savedExpense.invoice_date,
  //     transaction_type: 'Expense',
  //     transaction_category: savedExpense.expense_category_name,
  //     transaction_amount: savedExpense.amount * -1,
  //     transaction_currency: savedExpense.expense_currency,
  //   };

  //   try {
  //     const response = await axios.post(apiTransactionEndpoint, transaction);
  //     if (response.status !== 200) {
  //       throw Error(response.statusText);
  //     }
  //     const savedTransaction = response.data;
  //     const newTransactions = [...transactions, savedTransaction];
  //     setTransactions(newTransactions);
  //     // reloadTransactionData();
  //     success('Transaction added successfully');
  //   } catch (err) {
  //     handleAjaxError(err);
  //   }
  // };

  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(apiExpenseEndpoint, newExpense);
      console.log('Expenses: addExpense: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedExpense = response.data;
      const newExpenses = [...expenses, savedExpense];
      setExpenses(newExpenses);
      reloadExpenseData();

      // addTransaction(savedExpense);

      success('Expense added successfully');
      navigate(`/expenses/${savedExpense.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteExpense = async (expenseId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this expense?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiExpenseEndpoint}/${expenseId}`);
          console.log('Expenses: deleteExpense: response: ', response);
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          const newExpenses = expenses.filter((expense) => expense.id !== expenseId);
          setExpenses(newExpenses);
          success('Expense deleted successfully');
          navigate('/expenses');
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

  // const deleteExpense = async (expenseId) => {
  //   confirm({
  //     title: 'Confirmation',
  //     description: 'Are you sure you want to delete this expense?',
  //   })
  //     .then(async () => {
  //       try {
  //         const response = await axios.delete(`${apiExpenseEndpoint}/${expenseId}`);
  //         console.log('Success:', response);
  //         success('Expense Deleted!');
  //         navigate('/expenses');
  //         setExpenses(expenses.filter(expense => expense.id !== expenseId));
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
  //     const response = await window.fetch(`/api/v1/expenses/${expenseId}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) throw Error(response.statusText);

  //     // window.alert('Expense Deleted!');
  //     success('Expense Deleted!');
  //     navigate('/expenses');
  //     setExpenses(expenses.filter(expense => expense.id !== expenseId));
  //   } catch (error) {
  //     handleAjaxError(error);
  //   }
  // }
  // };

  const updateExpense = async (updatedExpense) => {
    try {
      const response = await axios.patch(`${apiExpenseEndpoint}/${updatedExpense.id}`, updatedExpense);
      console.log('Expenses: updateExpense: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newExpenses = expenses;
      const idx = newExpenses.findIndex((expense) => expense.id === updatedExpense.id);
      newExpenses[idx] = updatedExpense;
      setExpenses(newExpenses);
      reloadExpenseData();
      success('Expense Updated!');
      navigate(`/expenses/${updatedExpense.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      {/* <Header header="Expenses" /> */}
      <div className="grid">
        {/* {isError && <p>{error.message}</p>} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ErrorBoundary>
              <ExpenseList expenses={expenses} />
            </ErrorBoundary>
            <Routes>
              <Route
                path=":id"
                element={(
                  <ErrorBoundary>
                    <Expense
                      expenses={expenses}
                      accounts={accounts}
                      expenseCategories={expenseCategories}
                      onDelete={deleteExpense}
                    />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <ExpenseForm
                      expenses={expenses}
                      accounts={accounts}
                      expenseCategories={expenseCategories}
                      onSave={updateExpense}
                    />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <ExpenseForm
                      // For new Expense, do not pass expenses in order
                      // to set up initial state (blank fields)
                      // expenses={expenses}
                      accounts={accounts}
                      expenseCategories={expenseCategories}
                      onSave={addExpense}
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

Expenses.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Expenses;
