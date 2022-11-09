import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button, InputLabel, Select } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';

const Expense = ({ expenses, onDelete }) => {
  const { id } = useParams();
  const expense = expenses.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {expense.invoice_num}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="account_num"
              label="Account Number"
              value={expense.account_num || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="invoice_num"
              label="Invoice Number"
              value={expense.invoice_num || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              id="amount"
              name="amount"
              variant="outlined"
              label="Amount"
              customInput={TextField}
              type="text"
              value={expense.amount}
              size="small"
              fullWidth
              thousandSeparator=","
              decimalScale={2}
              fixedDecimalScale
              prefix="$ "
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="invoice_date"
              label="Invoice Date"
              value={expense.invoice_date.replace(/\//g, '-') || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="expense_category_name"
              label="Expense Category"
              value={expense.expense_category_name || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="expense_currency"
              label="Expense Currency"
              value={expense.expense_currency || ''}
              size="small"
              fullWidth
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="notes"
              label="Notes"
              value={expense.notes || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div className="button-mui">
          <Grid item xs={6}>
            <Stack spacing={2} direction="row">
              <Button
                sx={{
                  width: 100,
                  height: 40,
                }}
                variant="outlined"
                color="primary"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
              <Button
                sx={{
                  width: 100,
                  height: 40,
                }}
                type="submit"
                variant="contained"
                color="primary"
                component={Link}
                to={`/expenses/${expense.id}/edit`}
              >
                Edit
              </Button>
            </Stack>
          </Grid>
        </div>
      </FormControl>
    </div>
  );
};

Expense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    // id: PropTypes.number,
    invoice_date: PropTypes.string,
    invoice_num: PropTypes.string,
    amount: PropTypes.number,
    account_num: PropTypes.string,
    expense_category_name: PropTypes.string,
    created_at: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Expense;
