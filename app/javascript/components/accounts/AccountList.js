import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const AccountList = ({ accounts }) => {
  const columns = [
    {
      field: 'account_num',
      headerName: 'Account Number',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/accounts/${id}/transactions`}>{value}</Link>
        );
      },
    },
    {
      field: 'study_name',
      headerName: 'Study Name',
      width: 150,
      editable: false,
    },
    {
      field: 'study_title',
      headerName: 'Study Title',
      width: 150,
      editable: false,
    },
    {
      field: 'pi_name',
      headerName: 'PI Name',
      width: 150,
      editable: false,
    },
    {
      field: 'sponsor_name',
      headerName: 'Sponsor Name',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },
    {
      field: 'sponsor_contact',
      headerName: 'Sponsor Contact',
      width: 150,
      editable: false,
    },
    // {
    //   field: 'cim_contact',
    //   headerName: 'CIM Contact',
    //   width: 150,
    //   editable: false,
    // },
    {
      field: 'cro_name',
      headerName: 'CRO Name',
      width: 150,
      editable: false,
    },
    {
      field: 'cro_contact',
      headerName: 'CRO Contact',
      width: 150,
      editable: false,
    },
    // {
    //   field: 'phase',
    //   headerName: 'Phase',
    //   width: 150,
    //   editable: false,
    // },
    // {
    //   field: 'budget_currency',
    //   headerName: 'Budget Currency',
    //   width: 150,
    //   editable: false,
    // },
    {
      field: 'invoicing_terms',
      headerName: 'Invoicing Terms',
      width: 150,
      editable: false,
    },
    {
      field: 'budget_version',
      headerName: 'Budget Version',
      width: 150,
      editable: false,
    },
    {
      field: 'targeted_enrolling_number',
      headerName: 'Targeted Enrolling Number',
      width: 150,
      editable: false,
    },
    {
      field: 'cta_date',
      headerName: 'CTA Date',
      width: 150,
      editable: false,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 150,
      editable: false,
    },
  ];

  const renderAccounts = () => {
    // const sortedAccounts = [...accounts].sort((a, b) => new
    // Date(b.created_at) - new Date(a.created_at));
    const sortedAccounts = [...accounts].sort((a, b) => (a.account_num > b.account_num ? 1 : -1));
    return (
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
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#b7d7f4',
            color: 'black',
            fontVariantCaps: 'all-small-caps',
            fontStyle: 'bold',
            fontSize: 18,
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            '& .MuiDataGrid-row': {
              '&:nth-child(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
              '&:hover': { backgroundColor: '#d1e6f9' },
            },
          },
        }}
      >
        <DataGrid
          rowHeight={35}
          headerHeight={35}
          rows={sortedAccounts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="button-mui">
          <Button
            sx={{
              width: 125,
              height: 40,
              backgroundColor: 'white',
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/accounts/new"
          >
            Add New
          </Button>
          {/* <Button onClick={crash}>CRASH TEST</Button>
            <p style={{ color: "red" }}>{error.message}</p> */}

          {/* // This is the Search box maybe needed in the future */}
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
          {renderAccounts()}
        </div>
      </Stack>
    </section>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    account_num: PropTypes.string,
    study_name: PropTypes.string,
    study_title: PropTypes.string,
    pi_name: PropTypes.string,
    status: PropTypes.string,
    sponsor_name: PropTypes.string,
    sponsor_contact: PropTypes.string,
    targeted_enrolling_number: PropTypes.number,
    cta_date: PropTypes.string,
    // phase: PropTypes.string,
    // cim_contact: PropTypes.string,
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
