import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import PropTypes from 'prop-types';
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
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Account Summary
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Revenues: $
          {revenueTotal}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Overhead: $
          {revenueOverHeadTotal}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          After Overhead: $
          {revenueAfterOverHeadTotal}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Expenses: $
          {expenseTotal}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Balance: $
          {balance}
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
