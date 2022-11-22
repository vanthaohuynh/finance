import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const TransactionList = ({ transactions }) => {
  let newTransactions = [];
  // console.log('Transactions:', transactions);
  if (transactions.length !== 0) {
    transactions.forEach((transaction) => {
      const newTransaction = transaction;
      newTransaction.id = transaction.id;
      newTransaction.account_num = transaction.account_num;
      transaction.expenses.forEach((expense) => {
        newTransaction.expense_invoice_date = expense.invoice_date;
        newTransaction.expense_invoice_num = expense.invoice_num;

        newTransactions = [...newTransactions, newTransaction];
      });
      transaction.revenues.forEach((revenue) => {
        newTransaction.revenue_invoice_date = revenue.invoice_date;
        newTransaction.revenue_invoice_num = revenue.invoice_num;
        newTransaction.revenue_amount = revenue.amount;
        newTransaction.revenue_currency = revenue.revenue_currency;

        newTransactions = [...newTransactions, newTransaction];
      });
      newTransactions = [...newTransactions, newTransaction];
    });
    console.log('New Transactions:', newTransactions);
  }

  const columns = [
    {
      field: 'account_num',
      headerName: 'Account Number',
      width: 200,
      editable: false,
    },
    {
      field: 'expense_invoice_date',
      headerName: 'Exp Invoice Date',
      width: 100,
      editable: false,
    },
    {
      field: 'revenue_invoice_date',
      headerName: 'Rev Invoice Date',
      width: 100,
      editable: false,
    },
    {
      field: 'expense_invoice_num',
      headerName: 'Exp Invoice Number',
      width: 200,
      editable: false,
    },
    {
      field: 'revenue_invoice_num',
      headerName: 'Rev Invoice Number',
      width: 200,
      editable: false,
    },
    {
      field: 'expense_amount',
      headerName: 'Exp Amount',
      width: 200,
      editable: false,
    },
    {
      field: 'revenue_amount',
      headerName: 'Rev Amount',
      width: 200,
      editable: false,
    },
    {
      field: 'expense_category_name',
      headerName: 'Category',
      width: 200,
      editable: false,
    },
    {
      field: 'transaction_type',
      headerName: 'Type',
      width: 100,
      editable: false,
    },
    {
      field: 'transaction_amount',
      headerName: 'Amount',
      width: 100,
      editable: false,
    },
    {
      field: 'transaction_currency',
      headerName: 'Currency',
      width: 100,
      editable: false,
    },
  ];

  const renderTransactions = () => {
    // const sortedTransactions = [...transactions].sort((a, b) => new
    // Date(a.created_at) - new Date(b.created_at));
    const sortedTransactions = [...newTransactions].sort((a, b) => (b.id) - (a.id));
    return (
      <Box
        sx={{
          height: 320,
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
          rows={sortedTransactions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        {/* <div className="button-mui">
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
        </div> */}
        <div className="eventList">
          {renderTransactions()}
        </div>
      </Stack>
    </section>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account_id: PropTypes.number,
    account_num: PropTypes.string,
    invoice_num: PropTypes.string,
    invoice_date: PropTypes.string,
    transaction_type: PropTypes.string,
    transaction_category: PropTypes.string,
    transaction_amount: PropTypes.number,
    transaction_currency: PropTypes.string,
  })).isRequired,
};

export default TransactionList;
