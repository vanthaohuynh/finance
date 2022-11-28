import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const RevenueList = ({ revenues }) => {
  const columns = [
    {
      field: 'account_num',
      headerName: 'Account Number',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Link to={`/accounts/${params.row.account_id}/transactions`}>{params.value}</Link>
      ),
    },
    {
      field: 'revenue_category_name',
      headerName: 'Category',
      width: 150,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 125,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'overhead',
      headerName: 'Overhead',
      width: 125,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'after_overhead',
      headerName: 'After Overhead',
      width: 125,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'deposit_date',
      headerName: 'Deposit Date',
      width: 100,
      editable: false,
    },
    {
      field: 'invoice_date',
      headerName: 'Invoice Date',
      width: 100,
      editable: false,
    },
    {
      field: 'invoice_num',
      headerName: 'Invoice Number',
      width: 200,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/revenues/${id}`}>{value}</Link>
        );
      },
    },
    {
      field: 'notes ',
      headerName: 'Notes',
      width: 150,
      editable: false,
    },
  ];

  // /////////////////////////////////////////////////
  // This codes working without the Search (need a curly bracket after =>)
  // const renderRevenues = (revenueArray) => {
  // revenueArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  // return revenueArray.map((revenue) => (
  //   <li key={revenue.id}>
  //     <NavLink to={`/revenues/${revenue.id}`}>
  //       {revenue.revenue_num}
  //     </NavLink>
  //   </li>
  // ));
  // };
  // /////////////////////////////////////////////////
  // /////////////////////////////////////////////////
  // This codes working with the Search input. No need for curly bracket after =>)
  // const renderRevenues = (revenueArray) =>
  // revenueArray
  //   .filter((el) => matchSearchTerm(el))
  //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  //   .map((revenue) => (
  //     <li key={revenue.id}>
  //       <NavLink to={`/revenues/${revenue.id}`}>
  //           {revenue.revenue_num} - {revenue.study_title}
  //       </NavLink>
  //     </li>
  //   ));
  // /////////////////////////////////////////////////
  // /////////////////////////////////////////////////
  // Using MUI DaraGrid
  const renderRevenues = () => {
    // const sortedRevenues = [...revenues].sort((a, b) => new
    // Date(b.created_at) - new Date(a.created_at));
    const sortedRevenues = [...revenues].sort((a, b) => (a.account_num > b.account_num ? 1 : -1));
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
          rows={sortedRevenues}
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
            to="/revenues/new"
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
          {renderRevenues()}
        </div>
      </Stack>
    </section>
  );
};

RevenueList.propTypes = {
  revenues: PropTypes.arrayOf(PropTypes.shape({
    invoice_date: PropTypes.string,
    invoice_num: PropTypes.string,
    amount: PropTypes.number,
    account_num: PropTypes.string,
    revenue_category_name: PropTypes.string,
    overhead: PropTypes.number,
    after_overhead: PropTypes.number,
  })).isRequired,
};

export default RevenueList;
