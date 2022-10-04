import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
// import axios from 'axios';
import Header from '../Header';
import ExpenseList from './ExpenseList';
import Expense from './Expense';
import ExpenseForm from './ExpenseForm';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const confirm = useConfirm();
  // const [error, setError] = useState(Error());
  // const [isError, setIsError] = useState(false);
  // const apiExpenseEndpoint = '/api/v1/expenses';

  const apiAccountEndpoint = '/api/v1/accounts2';
  const apiExpenseCatEndpoint = '/api/v1/expense_categories';
  const apiExpenseEndpoint = '/api/v1/expenses';

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await window.fetch(apiExpenseEndpoint);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        handleAjaxError(err);
      }

      setIsLoading(false);
    };
    fetchExpenseData();

    const fetchAccountData = async () => {
      try {
        const response = await window.fetch(apiAccountEndpoint);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        handleAjaxError(err);
      }

      setIsLoading(false);
    };
    fetchAccountData();

    const fetchExpenseCategoryData = async () => {
      try {
        const response = await window.fetch(apiExpenseCatEndpoint);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setExpenseCategories(data);
      } catch (err) {
        handleAjaxError(err);
      }

      setIsLoading(false);
    };
    fetchExpenseCategoryData();
  }, []);

  const reloadExpenseData = async () => {
    try {
      const response = await window.fetch(apiExpenseEndpoint);
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      handleAjaxError(err);
    }

    setIsLoading(false);
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await window.fetch(apiExpenseEndpoint, {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedExpense = await response.json();
      const newExpenses = [...expenses, savedExpense];
      setExpenses(newExpenses);
      reloadExpenseData();
      // window.alert('Expense Added!');
      success('Expense Added!');
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
          const response = await window.fetch(`/api/v1/expenses/${expenseId}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw Error(response.statusText);

          // window.alert('Expense Deleted!');
          success('Expense Deleted!');
          navigate('/expenses');
          setExpenses(expenses.filter((expense) => expense.id !== expenseId));
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
      const response = await window.fetch(
        `/api/v1/expenses/${updatedExpense.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedExpense),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

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
      <Header header="Expenses" />
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

export default Expenses;
