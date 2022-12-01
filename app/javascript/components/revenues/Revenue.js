import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button, InputLabel, Select } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';

const Revenue = ({ revenues, onDelete }) => {
  const { id } = useParams();
  const revenue = revenues.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {revenue.invoice_num}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="account_num"
              label="Account Number"
              value={revenue.account_num || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="invoice_num"
              label="Invoice Number"
              value={revenue.invoice_num || ''}
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
              value={revenue.amount || ''}
              size="small"
              fullWidth
              thousandSeparator=","
              decimalScale={2}
              fixedDecimalScale
              prefix="$ "
            />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              id="overhead"
              name="overhead"
              variant="outlined"
              label="Overhead"
              customInput={TextField}
              type="text"
              value={revenue.overhead || ''}
              size="small"
              fullWidth
              thousandSeparator=","
              decimalScale={2}
              fixedDecimalScale
              prefix="$ "
            />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              id="after_overhead"
              name="after_overhead"
              variant="outlined"
              label="After Overhead"
              customInput={TextField}
              type="text"
              value={revenue.after_overhead || ''}
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
              value={revenue.invoice_date.replace(/\//g, '-') || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="deposit_date"
              label="Deposit Date"
              // value={revenue.deposit_date.replace(/\//g, '-') || ''}
              value={revenue.deposit_date ? revenue.deposit_date.replace(/\//g, '-') : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="revenue_category_name"
              label="Revenue Category"
              value={revenue.revenue_category_name || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              id="revenue_currency"
              label="Revenue Currency"
              value={revenue.revenue_currency || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              id="notes"
              label="Notes"
              value={revenue.notes || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div className="button-mui-edit">
          <Grid item xs={6}>
            <Stack spacing={2} direction="row">
              <Button
                sx={{
                  width: 100,
                  height: 40,
                  backgroundColor: 'white',
                }}
                variant="outlined"
                color="primary"
                onClick={() => onDelete(revenue.id)}
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
                to={`/revenues/${revenue.id}/edit`}
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

Revenue.propTypes = {
  revenues: PropTypes.arrayOf(PropTypes.shape({
    // id: PropTypes.number,
    invoice_date: PropTypes.string,
    deposit_date: PropTypes.string,
    invoice_num: PropTypes.string,
    amount: PropTypes.number,
    account_num: PropTypes.string,
    revenue_category_name: PropTypes.string,
    created_at: PropTypes.string,
    overhead: PropTypes.number,
    after_overhead: PropTypes.number,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Revenue;
