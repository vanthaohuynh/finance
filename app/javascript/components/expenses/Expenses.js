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
  const [expenseSubCategories, setExpenseSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();
  // const [expenseList, setExpenseList] = useState([]);

  const apiExpenseEndpoint = '/api/v1/expenses';
  const apiAccountEndpoint = '/api/v1/accounts2';
  const apiExpenseCatEndpoint = '/api/v1/expense_categories';
  const apiExpenseSubCatEndpoint = '/api/v1/expense_sub_categories';
  // const apiExpenseList = '/api/v1/expense_list';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  // const fetchExpenseList = async () => {
  //   try {
  //     const response = await axios.get(apiExpenseList);
  //     console.log('Dashboard ExpenseList: ', response);
  //     if (response.status === 200) {
  //       setExpenseList(response.data);
  //     }
  //   } catch (err) {
  //     handleAjaxError(err);
  //   }
  // };

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(apiExpenseEndpoint);
      // console.log('Expenses: fetchExpenseData: response: ', response);
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
      // console.log('Expenses: fetchAccountData: response: ', response);
      if (response.status === 200) {
        const sortedAccounts = response.data
          .sort((a, b) => (a.account_num > b.account_num ? 1 : -1));
        setAccounts(sortedAccounts);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseCategoryData = async () => {
    try {
      const response = await axios.get(apiExpenseCatEndpoint);
      // console.log('Expenses: fetchExpenseCategoryData: response: ', response);
      if (response.status === 200) {
        setExpenseCategories(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseSubCategoryData = async () => {
    try {
      const response = await axios.get(apiExpenseSubCatEndpoint);
      // console.log('Expenses: fetchExpenseSubCategoryData: response: ', response);
      if (response.status === 200) {
        setExpenseSubCategories(response.data);
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
          fetchExpenseSubCategoryData();
          // fetchExpenseList();
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

  const reloadExpenseData = async () => {
    try {
      const response = await axios.get(apiExpenseEndpoint);
      // console.log('Expenses: reloadExpenseData: response: ', response);
      if (response.status === 200) {
        setExpenses(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(apiExpenseEndpoint, newExpense);
      // console.log('Expenses: addExpense: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedExpense = response.data;
      const newExpenses = [...expenses, savedExpense];
      setExpenses(newExpenses);
      reloadExpenseData();
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
          // console.log('Expenses: deleteExpense: response: ', response);
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

  const updateExpense = async (updatedExpense) => {
    try {
      const response = await axios.patch(`${apiExpenseEndpoint}/${updatedExpense.id}`, updatedExpense);
      // console.log('Expenses: updateExpense: response: ', response);
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
      <div className="gridItem">
        {/* <div className="gridDashboard">
          <ExpenseChartByCategory expenseList={expenseList} />
        </div> */}
        <div className="grid">
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
                    expenseSubCategories={expenseSubCategories}
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
                    expenseSubCategories={expenseSubCategories}
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
                    expenseSubCategories={expenseSubCategories}
                    onSave={addExpense}
                  />
                </ErrorBoundary>
            )}
            />
          </Routes>
        </div>
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
