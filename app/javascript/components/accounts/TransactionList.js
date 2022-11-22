import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const TransactionList = ({ transactions }) => {
  const columns = [
    {
      field: 'account_num',
      headerName: 'Account Number',
      width: 150,
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
      width: 150,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
    },
    {
      field: 'transaction_type',
      headerName: 'Type',
      width: 100,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: false,
    },
    // {
    //   field: 'transaction_currency',
    //   headerName: 'Currency',
    //   width: 100,
    //   editable: false,
    // },
  ];

  const renderTransactions = () => {
    // const sortedTransactions = [...transactions].sort((a, b) => (b.id) - (a.id));
    const sortedTransactions = [...transactions].sort((a, b) => new
    Date(a.invoice_date) - new Date(b.invoice_date));
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
    account_num: PropTypes.string,
    invoice_num: PropTypes.string,
    invoice_date: PropTypes.string,
    transaction_type: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    currency: PropTypes.string,
  })).isRequired,
};

// TransactionList.propTypes = {
//   account: PropTypes.shape({
//     id: PropTypes.number,
//     account_num: PropTypes.string,
//     expenses: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       invoice_num: PropTypes.string,
//       invoice_date: PropTypes.string,
//       amount: PropTypes.number,
//       expense_currency: PropTypes.string,
//       expense_category_name: PropTypes.string,
//     })),
//     revenues: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       invoice_num: PropTypes.string,
//       invoice_date: PropTypes.string,
//       amount: PropTypes.number,
//       revenue_currency: PropTypes.string,
//       revenue_category_name: PropTypes.string,
//       revenue_overhead: PropTypes.number,
//       revenue_after_overhead: PropTypes.number,
//     })),
//   }).isRequired,
// };

export default TransactionList;
