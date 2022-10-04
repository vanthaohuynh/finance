import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const ExpenseList = ({ expenses }) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const searchInput = useRef(null);
  // const [error, setError] = useState({ message: "I'm an error message" });

  // For Testing Error Boundary
  // const crash = () => {
  //   setError(null);
  // };

  // For Search Input
  // const updateSearchTerm = () => {
  //   setSearchTerm(searchInput.current.value);
  // };

  // const matchSearchTerm = (obj) => {
  //   const { id, created_at, updated_at, ...rest } = obj;
  //   return Object.values(rest).some(
  //     (value) => value?.toString().toLowerCase().indexOf(searchTerm?.toString()
  // .toLowerCase()) > -1
  //   );
  // };

  const columns = [
    {
      field: 'invoice_num',
      headerName: 'Invoice Number',
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
      field: 'invoice_date',
      headerName: 'Invoice Date',
      width: 150,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: false,
    },
    {
      field: 'account_num',
      headerName: 'Account Number',
      width: 150,
      editable: false,
    },
    {
      field: 'expense_category_name',
      headerName: 'Expense Category',
      width: 150,
      editable: false,
    },
  ];

  // /////////////////////////////////////////////////
  // This codes working without the Search (need a curly bracket after =>)
  // const renderExpenses = (expenseArray) => {
  // expenseArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  // return expenseArray.map((expense) => (
  //   <li key={expense.id}>
  //     <NavLink to={`/expenses/${expense.id}`}>
  //       {expense.expense_num}
  //     </NavLink>
  //   </li>
  // ));
  // };
  // /////////////////////////////////////////////////
  // /////////////////////////////////////////////////
  // This codes working with the Search input. No need for curly bracket after =>)
  // const renderExpenses = (expenseArray) =>
  // expenseArray
  //   .filter((el) => matchSearchTerm(el))
  //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  //   .map((expense) => (
  //     <li key={expense.id}>
  //       <NavLink to={`/expenses/${expense.id}`}>
  //           {expense.expense_num} - {expense.study_title}
  //       </NavLink>
  //     </li>
  //   ));
  // /////////////////////////////////////////////////
  // /////////////////////////////////////////////////
  // Using MUI DaraGrid
  const renderExpenses = (expenses) => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
        }}
      >
        <DataGrid
          rows={sortedExpenses}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
        {/* </DataGrid> */}
      </Box>
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
          {renderExpenses(expenses)}
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
