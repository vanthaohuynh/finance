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

const RevenueRIYearTable = ({ transactions }) => {
  const revenueTransactions = transactions
    .filter((transaction) => transaction.transaction_type === 'Revenue' && transaction.deposit_date !== null);

  let thisyearTotal = 0;
  let lastyearTotal = 0;
  let twoyearsagoTotal = 0;
  let threeyearsagoTotal = 0;
  let total = 0;

  const currentYear = new Date().getFullYear();
  const currentFromDate = new Date(currentYear.toString() + "-04-01T00:00:00");
  const currentToDate = new Date((currentYear + 1).toString() + "-03-31T00:00:00");
  const currentYearLabel = currentYear.toString() + "-04-01 - " + (currentYear + 1).toString() + "-03-31";
  const lastYear = currentYear - 1;
  const lastFromDate = new Date(lastYear.toString() + "-04-01T00:00:00");
  const lastToDate = new Date(currentYear.toString() + "-03-31T00:00:00");
  const lastYearLabel = lastYear.toString() + "-04-01 - " + currentYear.toString() + "-03-31";
  const twoYearsAgo = currentYear - 2;
  const twoFromDate = new Date(twoYearsAgo.toString() + "-04-01T00:00:00");
  const twoToDate = new Date(lastYear.toString() + "-03-31T00:00:00");
  const twoYearsAgoLabel = twoYearsAgo.toString() + "-04-01 - " + lastYear.toString() + "-03-31";
  const threeYearsAgo = currentYear - 3;
  const threeFromDate = new Date(threeYearsAgo.toString() + "-04-01T00:00:00");
  const threeToDate = new Date(twoYearsAgo.toString() + "-03-31T00:00:00");
  const threeYearsAgoLabel = threeYearsAgo.toString() + "-04-01 - " + twoYearsAgo.toString() + "-03-31";

  revenueTransactions.forEach((transaction) => {
    const DepositDate = new Date(transaction.deposit_date);
    total += transaction.amount;
    if (DepositDate >= currentFromDate && DepositDate <= currentToDate) {
      thisyearTotal += transaction.amount;
    } else if (DepositDate >= lastFromDate && DepositDate <= lastToDate) {
      lastyearTotal += transaction.amount;
    } else if (DepositDate >= twoFromDate && DepositDate <= twoToDate) {
      twoyearsagoTotal += transaction.amount;
    } else if (DepositDate >= threeFromDate && DepositDate <= threeToDate) {
      threeyearsagoTotal += transaction.amount;
    }
  });

  function createData(name, value) {
    const valueFormatted = Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return { name, valueFormatted };
  }

  const rows = [
    createData(threeYearsAgoLabel, threeyearsagoTotal),
    createData(twoYearsAgoLabel, twoyearsagoTotal),
    createData(lastYearLabel, lastyearTotal),
    createData(currentYearLabel, thisyearTotal),
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
              Revenue by RI Year (April 1 - March 31)
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

RevenueRIYearTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    invoice_num: PropTypes.string,
    invoice_date: PropTypes.string,
    transaction_type: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    // currency: PropTypes.string,
  })).isRequired,
};

export default RevenueRIYearTable;
