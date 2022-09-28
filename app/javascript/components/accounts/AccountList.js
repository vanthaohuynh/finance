import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const AccountList = ({ accounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);
  const [error, setError] = useState({ message: "I'm an error message" });

  const crash = () => {
    setError(null);
  };

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value?.toString().toLowerCase().indexOf(searchTerm?.toString().toLowerCase()) > -1
    );
  };

  const columns = [
  {
    field: 'account_num',
    headerName: 'Account Number',
    width: 200,
    editable: false,
    renderCell: params => {
      const { id } = params;
      const { value } = params;
      return (
        <Link to={`/accounts/${params.id}`}>{value}</Link>
      );
    },
  },
  {
    field: 'study_title',
    headerName: 'Study Title',
    width: 150,
    editable: false,
  },
  {
    field: 'study_name',
    headerName: 'Study Name',
    width: 150,
    editable: false,
  },
];

  ///////////////////////////////////////////////////
  // This codes working without the Search (need a curly bracket after =>)
  // const renderAccounts = (accountArray) => {
    // accountArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    // return accountArray.map((account) => (
    //   <li key={account.id}>
    //     <NavLink to={`/accounts/${account.id}`}>
    //       {account.account_num}
    //     </NavLink>
    //   </li>
    // ));
    // };
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // This codes working with the Search input. No need for curly bracket after =>)
    // const renderAccounts = (accountArray) =>
    // accountArray
    //   .filter((el) => matchSearchTerm(el))
    //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    //   .map((account) => (
    //     <li key={account.id}>
    //       <NavLink to={`/accounts/${account.id}`}>
    //           {account.account_num} - {account.study_title}
    //       </NavLink>
    //     </li>
    //   ));
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // Using MUI DaraGrid
    const renderAccounts = (accounts) =>
    {
      const sortedAccounts = [...accounts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return (
        <>
          <Box
            sx={{
              height: 500,
              width: '100%',
              '& .actions': {
                color: 'text.secondary',
              },
              '& .textPrimary': {
                color: 'text.primary',
              },
            }}
          >
            <DataGrid
              rows={sortedAccounts}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            >
            </DataGrid>
          </Box>
        </>
      );
    };

  return (
    <section>
      <Stack spacing={2}>
        <div className="button-mui" align="left">
          <Button
            sx={{
              width: 125,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link} to="/accounts/new"
          >
            Add New
          </Button>
          {/* <Button onClick={crash}>CRASH TEST</Button>
            <p style={{ color: "red" }}>{error.message}</p> */}

          {/* // This is the Search box maybe needed in the future*/}
          {/* <Grid item xs={6}>
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
          </Grid> */}
        </div>
        <div className="eventList">
          {renderAccounts(accounts)}
        </div>
      </Stack>
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
