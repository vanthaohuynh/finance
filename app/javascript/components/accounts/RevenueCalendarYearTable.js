import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const RevenueCalendarYearTable = ({ transactions }) => {
  const revenueTransactions = transactions.filter((transaction) => transaction.transaction_type === 'Revenue');
  // const revenueTotal = revenueTransactions
  //   .reduce((acc, transaction) => acc + transaction.amount, 0);
  // const revenueOverHeadTotal = revenueTransactions
  //   .reduce((acc, transaction) => acc + transaction.overhead, 0);
  // const revenueAfterOverHeadTotal = revenueTotal - revenueOverHeadTotal;

  const total = 0;
  const thisyearTotal = 0;
  const lastyearTotal = 0;
  const twoyearsagoTotal = 0;
  const threeyearsagoTotal = 0;

  function createData(name, value) {
    const valueFormatted = Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return { name, valueFormatted };
  }

  const rows = [
    createData('2019', threeyearsagoTotal),
    createData('2020', twoyearsagoTotal),
    createData('2021', lastyearTotal),
    createData('2022', thisyearTotal),
  ];

  const formattedTotal = Number(total).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <TableContainer
      component={Paper}
      // sx={{
      //   width: '100%',
      //   maxWidth: '500px',
      //   margin: 'auto',
      // }}
    >
      <Table
        sx={{
          width: '100%',
        }}
        size="small"
        // aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="left"
              sx={{
                backgroundColor: '#b7d7f4',
                // fontVariant: 'small-caps',
                fontWeight: 'bold',
              }}
            >
              Revenue by Calendar Year
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.valueFormatted}</TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
              component="th"
              scope="row"
              align="left"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Total
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: 'bold',
              }}
            >
              {formattedTotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

RevenueCalendarYearTable.propTypes = {
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

export default RevenueCalendarYearTable;
