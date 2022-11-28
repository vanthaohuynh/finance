import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AccountSummaryCard = ({ cardTransactionData }) => {
  const revenueTransactions = cardTransactionData.filter((transaction) => transaction.transaction_type === 'Revenue');
  const expenseTransactions = cardTransactionData.filter((transaction) => transaction.transaction_type === 'Expense');
  const revenueTotal = revenueTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const revenueOverHeadTotal = revenueTransactions
    .reduce((acc, transaction) => acc + transaction.overhead, 0);
  const revenueAfterOverHeadTotal = revenueTotal - revenueOverHeadTotal;
  const expenseTotal = expenseTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const balance = revenueTotal - expenseTotal;
  // console.log('revenueTotal', revenueTotal);
  // console.log('expenseTotal', expenseTotal);
  // console.log('balance', balance);

  return (
    <Card
      sx={{
        width: '100%',
        // backgroundColor: '#4085E6',
      }}
      // variant="outlined"
    >
      <CardHeader
        title="Account Summary"
        variant="body"
      />
      <CardContent>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Account Summary
        </Typography> */}
        <Typography variant="h5" component="div">
          Revenue
        </Typography>
        <Typography variant="body2" component="div">
          Total Revenue:
          {revenueTotal}
        </Typography>
        <Typography variant="body2" component="div">
          Total Overhead:
          {revenueOverHeadTotal}
        </Typography>
        <Typography variant="body2" component="div">
          Total Revenue After Overhead:
          {revenueAfterOverHeadTotal}
        </Typography>
        <Typography variant="body2" component="div">
          Total Expenses:
          {expenseTotal}
        </Typography>
        <Typography variant="body2" component="div">
          Balance:
          {
            balance
          }
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

AccountSummaryCard.propTypes = {
  cardTransactionData: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    invoice_num: PropTypes.string,
    invoice_date: PropTypes.string,
    transaction_type: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    currency: PropTypes.string,
  })).isRequired,
};

export default AccountSummaryCard;
