import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../../Header';
import RevenueCatList from './RevenueCatList';
import RevenueCategory from './RevenueCategory';
import RevenueCatForm from './RevenueCatForm';
import { info, success } from '../../../helpers/notifications';
import { handleAjaxError } from '../../../helpers/helpers';
import ErrorBoundary from '../../../ErrorBoundary';

const RevenueCategories = ({ userRoleID, token, handleSelectedIndex, handleLogout }) => {
  const [revenueCategories, setRevenueCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const apiRevenueCatEndpoint = '/api/v1/revenue_categories';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchRevenueCategoryData = async () => {
    try {
      const response = await axios.get(apiRevenueCatEndpoint);
      console.log('Revenues: fetchRevenueCategoryData: response: ', response);
      if (response.status === 200) {
        setRevenueCategories(response.data);
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
          fetchRevenueCategoryData();
        } else {
          setIsValidated(false);
          // navigate('/api/v1/revenues');
        }
      } catch (err) {
        handleAjaxError(err);
        setIsValidated(false);
        handleLogout();
      }
    };
    validateToken();
    handleSelectedIndex(4);
  }, []); // Need to keep this empty

  const reloadRevenueCategoriesData = async () => {
    try {
      const response = await axios.get(apiRevenueCatEndpoint);
      console.log('Revenues: reloadRevenueData: response: ', response);
      if (response.status === 200) {
        setRevenueCategories(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addRevenueCategory = async (newRevenueCategory) => {
    try {
      const response = await axios.post(apiRevenueCatEndpoint, newRevenueCategory);
      console.log('Revenues: addRevenue: response: ', response);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedRevenueCategory = response.data;
      const newRevenueCategories = [...revenueCategories, savedRevenueCategory];
      setRevenueCategories(newRevenueCategories);
      reloadRevenueCategoriesData();
      success('Revenue Category added successfully');
      navigate(`/revenue_categories/${savedRevenueCategory.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteRevenueCategory = async (revenueCatId) => {
    confirm({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this Revenue Category?',
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiRevenueCatEndpoint}/${revenueCatId}`);
          console.log('Revenues: deleteRevenue: response: ', response);
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          const newRevenueCategories = revenueCategories
            .filter((revenueCat) => revenueCat.id !== revenueCatId);
          setRevenueCategories(newRevenueCategories);
          success('Revenue Category deleted');
          navigate('/revenue_categories');
        } catch (err) {
          handleAjaxError(err);
          console.log('Revenues: deleteRevenue: err: ', err);
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

  const updateRevenueCategory = async (updatedRevenueCategory) => {
    try {
      const response = await axios
        .patch(`${apiRevenueCatEndpoint}/${updatedRevenueCategory.id}`, updatedRevenueCategory);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const newRevenueCategories = revenueCategories;
      const idx = newRevenueCategories
        .findIndex((revenueCat) => revenueCat.id === updatedRevenueCategory.id);
      newRevenueCategories[idx] = updatedRevenueCategory;
      setRevenueCategories(newRevenueCategories);
      reloadRevenueCategoriesData();
      success('Revenue Category updated successfully');
      navigate(`/revenue_categories/${updatedRevenueCategory.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      {/* <Header header="Revenue Categories" /> */}
      <div className="grid">
        {/* {isError && <p>{error.message}</p>} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ErrorBoundary>
              <RevenueCatList revenueCategories={revenueCategories} />
            </ErrorBoundary>
            <Routes>
              <Route
                path=":id"
                element={(
                  <ErrorBoundary>
                    <RevenueCategory
                      revenueCategories={revenueCategories}
                      onDelete={deleteRevenueCategory}
                    />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <RevenueCatForm
                      revenueCategories={revenueCategories}
                      onSave={updateRevenueCategory}
                    />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <RevenueCatForm
                      revenueCategories={revenueCategories}
                      onSave={addRevenueCategory}
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

RevenueCategories.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default RevenueCategories;
