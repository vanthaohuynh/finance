import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
// import axios from 'axios';
import Header from '../Header';
import RevenueList from './RevenueList';
import Revenue from './Revenue';
import RevenueForm from './RevenueForm';
import { success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const Revenues = () => {
  const [revenues, setRevenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const confirm = useConfirm();
  // const [error, setError] = useState(Error());
  // const [isError, setIsError] = useState(false);
  // const apiRevenueEndpoint = '/api/v1/revenues';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/revenues');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setRevenues(data);
      } catch (err) {
        handleAjaxError(err);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addRevenue = async (newRevenue) => {
    try {
      const response = await window.fetch('/api/v1/revenues', {
        method: 'POST',
        body: JSON.stringify(newRevenue),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedRevenue = await response.json();
      const newRevenues = [...revenues, savedRevenue];
      setRevenues(newRevenues);
      // window.alert('Revenue Added!');
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
          const response = await window.fetch(`/api/v1/revenues/${revenueId}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw Error(response.statusText);

          // window.alert('Revenue Deleted!');
          success('Revenue Deleted!');
          navigate('/revenues');
          setRevenues(revenues.filter(revenue => revenue.id !== revenueId));
        } catch (err) {
          handleAjaxError(err);
          // To be implemented: Using ErrorBoundary
          // setError(err);
          // setIsError(true);
          // console.error(Error(err.message ? err.message : err));
        }
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
      const response = await window.fetch(
        `/api/v1/revenues/${updatedRevenue.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedRevenue),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const newRevenues = revenues;
      const idx = newRevenues.findIndex((revenue) => revenue.id === updatedRevenue.id);
      newRevenues[idx] = updatedRevenue;
      setRevenues(newRevenues);

      success('Revenue Updated!');
      navigate(`/revenues/${updatedRevenue.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      <Header header="Revenues" />
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
                    <Revenue revenues={revenues} onDelete={deleteRevenue} />
                  </ErrorBoundary>
                )}
              />
              <Route
                path=":id/edit"
                element={(
                  <ErrorBoundary>
                    <RevenueForm revenues={revenues} onSave={updateRevenue} />
                  </ErrorBoundary>
                  )}
              />
              <Route
                path="new"
                element={(
                  <ErrorBoundary>
                    <RevenueForm onSave={addRevenue} />
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

export default Revenues;
