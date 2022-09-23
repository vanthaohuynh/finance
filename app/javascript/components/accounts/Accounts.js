import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import Header from './components/Header';
import Header from '../Header';
import AccountList from './AccountList';
import Account from './Account';
import AccountForm from './AccountForm';
import { success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';


const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/accounts');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addAccount = async (newAccount) => {
    try {
      const response = await window.fetch('/api/v1/accounts', {
        method: 'POST',
        body: JSON.stringify(newAccount),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedAccount = await response.json();
      const newAccounts = [...accounts, savedAccount];
      setAccounts(newAccounts);
      // window.alert('Account Added!');
      success('Account Added!');
      navigate(`/accounts/${savedAccount.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteAccount = async (accountId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/v1/accounts/${accountId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        // window.alert('Account Deleted!');
        success('Account Deleted!');
        navigate('/accounts');
        setAccounts(accounts.filter(account => account.id !== accountId));
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateAccount = async (updatedAccount) => {
    try {
      const response = await window.fetch(
        `/api/v1/accounts/${updatedAccount.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedAccount),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const newAccounts = Accounts;
      const idx = newAccounts.findIndex((account) => account.id === updatedAccount.id);
      newAccounts[idx] = updatedAccount;
      setAccounts(newAccounts);

      success('Account Updated!');
      navigate(`/accounts/${updatedAccount.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };


  return (
    <>
      <Header header="Accounts" />
      <div className="grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <AccountList accounts={accounts} />
            <Routes>
              <Route
                path=":id"
                element={<Account accounts={accounts} onDelete={deleteAccount} />}
              />
              <Route
                path=":id/edit"
                element={<AccountForm accounts={accounts} onSave={updateAccount} />}
              />
              <Route path="new" element={<AccountForm onSave={addAccount} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Accounts;
