import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const ExpenseList = ({ expenses }) => {
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
      field: 'expense_category_name',
      headerName: 'Category',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerClassName: 'super-app-theme--header',
      width: 150,
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
      field: 'invoice_date',
      headerName: 'Invoice Date',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'invoice_num',
      headerName: 'Invoice Number',
      headerClassName: 'super-app-theme--header',
      width: 200,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/expenses/${id}`}>{value}</Link>
        );
      },
    },
    {
      field: 'notes ',
      headerName: 'Notes',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
  ];

  const renderExpenses = () => {
    const sortedExpenses = [...expenses].sort((a, b) => new
    Date(b.created_at) - new Date(a.created_at));
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
          rows={sortedExpenses}
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
            to="/expenses/new"
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
          {renderExpenses()}
        </div>
      </Stack>
    </section>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    invoice_date: PropTypes.string,
    invoice_num: PropTypes.string,
    amount: PropTypes.number,
    account_num: PropTypes.string,
    expense_category_name: PropTypes.string,
  })).isRequired,
};

export default ExpenseList;
