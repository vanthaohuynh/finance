import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../../Header';
import ExpenseCatList from './ExpenseCatList';
import ExpenseSubCatList from './ExpenseSubCatList';
import ExpenseCategory from './ExpenseCategory';
import ExpenseCatForm from './ExpenseCatForm';
import { info, success } from '../../../helpers/notifications';
import { handleAjaxError } from '../../../helpers/helpers';
import ErrorBoundary from '../../../ErrorBoundary';

const ExpenseCategories = ({
  userRoleID,
  token,
  handleSelectedIndex,
  handleLogout,
}) => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseSubCategories, setExpenseSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const apiExpenseCatEndpoint = '/api/v1/expense_categories';
  const apiExpenseSubCatEndpoint = '/api/v1/expense_sub_categories';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

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

  const fetchExpenseSubCategoryData = async () => {
    try {
      const response = await axios.get(apiExpenseSubCatEndpoint);
      console.log('Expenses: fetchExpenseSubCategoryData: response: ', response);
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
          fetchExpenseCategoryData();
          fetchExpenseSubCategoryData();
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
    handleSelectedIndex(3);
  }, []); // Need to keep this empty

  const reloadExpenseCategoriesData = async () => {
    try {
      const response = await axios.get(apiExpenseCatEndpoint);
      console.log('Expenses: reloadExpenseData: response: ', response);
      if (response.status === 200) {
        setExpenseCategories(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addExpenseCategory = async (newExpenseCategory) => {
    try {
      const response = await axios.post(apiExpenseCatEndpoint, newExpenseCategory);
      console.log('Expenses: addExpense: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedExpenseCategory = response.data;
      const newExpenseCategories = [...expenseCategories, savedExpenseCategory];
      setExpenseCategories(newExpenseCategories);
      reloadExpenseCategoriesData();
      success('Expense Category added successfully');
      navigate(`/expense_categories/${savedExpenseCategory.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteExpenseCategory = async (expenseCatId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this Expense Category?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiExpenseCatEndpoint}/${expenseCatId}`);
          console.log('Expenses: deleteExpense: response: ', response);
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          const newExpenseCategories = expenseCategories
            .filter((expenseCat) => expenseCat.id !== expenseCatId);
          setExpenseCategories(newExpenseCategories);
          success('Expense Category deleted');
          navigate('/expense_categories');
        } catch (err) {
          handleAjaxError(err);
          console.log('Expenses: deleteExpense: err: ', err);
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

  const updateExpenseCategory = async (updatedExpenseCategory) => {
    try {
      const response = await axios
        .patch(`${apiExpenseCatEndpoint}/${updatedExpenseCategory.id}`, updatedExpenseCategory);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newExpenseCategories = expenseCategories;
      const idx = newExpenseCategories
        .findIndex((expenseCat) => expenseCat.id === updatedExpenseCategory.id);
      newExpenseCategories[idx] = updatedExpenseCategory;
      setExpenseCategories(newExpenseCategories);
      reloadExpenseCategoriesData();
      success('Expense Category updated successfully');
      navigate(`/expense_categories/${updatedExpenseCategory.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      {/* <Header header="Expense Categories" /> */}
      <div className="gridExpenseCategory">
        {/* {isError && <p>{error.message}</p>} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ErrorBoundary>
              <ExpenseCatList expenseCategories={expenseCategories} />
            </ErrorBoundary>
            <Routes>
              <Route
                path=":id"
                element={(
                  <ErrorBoundary>
                    <ExpenseCategory
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      expenseSubCategories={expenseSubCategories}
                      onDelete={deleteExpenseCategory}
                    />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <ExpenseCatForm
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      onSave={updateExpenseCategory}
                    />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <ExpenseCatForm
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      onSave={addExpenseCategory}
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

ExpenseCategories.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default ExpenseCategories;
