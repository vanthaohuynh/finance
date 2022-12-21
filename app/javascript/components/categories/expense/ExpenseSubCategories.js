import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../../Header';
// import ExpenseCatList from './ExpenseCatList';
import ExpenseSubCatList from './ExpenseSubCatList';
import ExpenseSubCategory from './ExpenseSubCategory';
import ExpenseSubCatForm from './ExpenseSubCatForm';
import { info, success } from '../../../helpers/notifications';
import { handleAjaxError } from '../../../helpers/helpers';
import ErrorBoundary from '../../../ErrorBoundary';

const ExpenseSubCategories = ({
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
        const sortedExpenseCategories = response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        setExpenseCategories(sortedExpenseCategories);
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
        const sortedExpenseSubCategories = response.data
          .sort((a, b) => (a.expense_code > b.expense_code ? 1 : -1));
          // .sort((a, b) => (a.expense_category_name > b.expense_category_name ? 1 : -1))
        setExpenseSubCategories(sortedExpenseSubCategories);
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
    handleSelectedIndex(5);
  }, []); // Need to keep this empty

  const reloadExpenseSubCategoriesData = async () => {
    try {
      const response = await axios.get(apiExpenseSubCatEndpoint);
      console.log('Expenses: reloadExpenseSubData: response: ', response);
      if (response.status === 200) {
        const sortedExpenseSubCategories = response.data
          .sort((a, b) => (a.expense_code > b.expense_code ? 1 : -1));
          // .sort((a, b) => (a.expense_category_name > b.expense_category_name ? 1 : -1))
        setExpenseSubCategories(sortedExpenseSubCategories);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addExpenseSubCategory = async (newExpenseSubCategory) => {
    try {
      const response = await axios.post(apiExpenseSubCatEndpoint, newExpenseSubCategory);
      console.log('Expenses: addExpenseSubCategory: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedExpenseSubCategory = response.data;
      const newExpenseSubCategories = [...expenseSubCategories, savedExpenseSubCategory];
      setExpenseSubCategories(newExpenseSubCategories);
      reloadExpenseSubCategoriesData();
      success('Expense Sub Category added successfully');
      navigate(`/expense_sub_categories/${savedExpenseSubCategory.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteExpenseSubCategory = async (expenseSubCatId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this Expense Sub Category?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiExpenseSubCatEndpoint}/${expenseSubCatId}`);
          console.log('Expenses: deleteExpenseSub: response: ', response);
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          const newExpenseSubCategories = expenseSubCategories
            .filter((expenseSubCat) => expenseSubCat.id !== expenseSubCatId);
          setExpenseSubCategories(newExpenseSubCategories);
          success('Expense Sub Category deleted');
          navigate('/expense_sub_categories');
        } catch (err) {
          handleAjaxError(err);
          console.log('Expenses: deleteExpenseSub: err: ', err);
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

  const updateExpenseSubCategory = async (updatedExpenseSubCategory) => {
    try {
      const response = await axios
        .patch(`${apiExpenseSubCatEndpoint}/${updatedExpenseSubCategory.id}`, updatedExpenseSubCategory);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newExpenseSubCategories = expenseSubCategories;
      const idx = newExpenseSubCategories
        .findIndex((expenseSubCat) => expenseSubCat.id === updatedExpenseSubCategory.id);
      newExpenseSubCategories[idx] = updatedExpenseSubCategory;
      setExpenseSubCategories(newExpenseSubCategories);
      reloadExpenseSubCategoriesData();
      success('Expense Sub Category updated successfully');
      navigate(`/expense_sub_categories/${updatedExpenseSubCategory.id}`);
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
              <ExpenseSubCatList
                // expenseCategories={expenseCategories}
                expenseSubCategories={expenseSubCategories}
              />
            </ErrorBoundary>
            <Routes>
              <Route
                path=":id"
                element={(
                  <ErrorBoundary>
                    <ExpenseSubCategory
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      expenseSubCategories={expenseSubCategories}
                      onDelete={deleteExpenseSubCategory}
                    />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <ExpenseSubCatForm
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      expenseSubCategories={expenseSubCategories}
                      onSave={updateExpenseSubCategory}
                    />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <ExpenseSubCatForm
                      userRoleID={userRoleID}
                      expenseCategories={expenseCategories}
                      expenseSubCategories={expenseSubCategories}
                      onSave={addExpenseSubCategory}
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

ExpenseSubCategories.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default ExpenseSubCategories;
