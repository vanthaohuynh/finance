import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';

const AccountList = ({ accounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value?.toString().toLowerCase().indexOf(searchTerm?.toString().toLowerCase()) > -1
    );
  };

  const renderAccounts = (accountArray) =>
    // accountArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    // return accountArray.map((account) => (
    //   <li key={account.id}>
    //     <NavLink to={`/accounts/${account.id}`}>
    //       {account.account_num}
    //     </NavLink>
    //   </li>
    // ));
    accountArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((account) => (
        <li key={account.id}>
          <NavLink to={`/accounts/${account.id}`}>
             {account.account_num}
         </NavLink>
        </li>
      ));
  // };

  return (
    <section className="eventList">
      {/* <h4>Accounts</h4> */}
      <h2>
        <Link to="/accounts/new">New Account</Link>
      </h2>

      {/* <input
        className="search"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      /> */}

      <Grid item xs={6}>
        <TextField
          type="text"
          className="search"
          placeholder="Search"
          inputRef={searchInput}
          onKeyUp={updateSearchTerm}
          size="small"
          fullWidth
          variant="outlined"
        />
      </Grid>

      <ul>{renderAccounts(accounts)}</ul>
    </section>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    account_num: PropTypes.string,
    muhc_account: PropTypes.string,
    study_title: PropTypes.string,
    study_name: PropTypes.string,
    sponsor_name: PropTypes.string,
    sponsor_contact: PropTypes.string,
    number_of_patients: PropTypes.number,
    cta_date: PropTypes.string,
    phase: PropTypes.string,
    cim_contact: PropTypes.string,
    cro_name: PropTypes.string,
    cro_contact: PropTypes.string,
    budget_version: PropTypes.string,
    budget_currency: PropTypes.string,
    invoicing_terms: PropTypes.string,
    notes: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })).isRequired,
};

export default AccountList;
