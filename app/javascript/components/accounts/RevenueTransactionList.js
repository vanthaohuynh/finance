import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const RevenueTransactionList = ({ transactions }) => {
  const revenueTransactions = transactions.filter((transaction) => transaction.transaction_type === 'Revenue');
  const columns = [
    {
      field: 'category',
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
      width: 150,
      editable: false,
      // It works but not all the time
      // renderCell: (params) => (
      //   <Link to={`/revenues/${params.row.invoice_id}`}>{params.value}</Link>
      // ),
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 100,
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
    const sortedTransactions = [...revenueTransactions].sort((a, b) => new
    Date(a.invoice_date) - new Date(b.invoice_date));
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
          rows={sortedTransactions}
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
        <div className="eventList">
          {renderTransactions()}
        </div>
      </Stack>
    </section>
  );
};

RevenueTransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    invoice_num: PropTypes.string,
    invoice_id: PropTypes.number,
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

export default RevenueTransactionList;
