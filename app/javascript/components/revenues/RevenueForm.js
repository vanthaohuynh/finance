import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateRevenue } from '../../helpers/helpers';

const RevenueForm = ({ revenues, accounts, revenueCategories, onSave }) => {
  const { id } = useParams();

  const initialRevenueState = useCallback(
    () => {
      const defaults = {
        invoice_date: null,
        invoice_num: '',
        amount: '',
        account_id: '',
        revenue_category_id: '',
        revenue_currency: '',
        notes: '',
      };

      const currRevenue = id ? revenues.find((e) => e.id === Number(id)) : {};
      if (!isEmptyObject(currRevenue)) {
        // Need to replace - with / to fix problem with Javascript Date object off by one day
        currRevenue.invoice_date = currRevenue.invoice_date.replace(/-/g, '\/');
      }
      return { ...defaults, ...currRevenue };
    },
    [revenues, id],
  );

  const [revenue, setRevenue] = useState(initialRevenueState);
  const [formErrors, setFormErrors] = useState({});
  // const dateInput = useRef(null);
  const cancelURL = revenue.id ? `/revenues/${revenue.id}` : '/revenues';
  const title = revenue.id ? `${revenue.invoice_num}` : 'New Revenue';

  useEffect(() => {
    setRevenue(initialRevenueState);
  }, [revenues]);

  const updateRevenue = (key, value) => {
    setRevenue((prevRevenue) => ({ ...prevRevenue, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateRevenue(name, val);
  };

  const handleNumberInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateRevenue(name, val);
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateRevenue('invoice_date', formatDate(val));
  };

  // useEffect(() => {
  //   const p = new Pikaday({
  //     field: dateInput.current,
  //     toString: (date) => formatDate(date),
  //     onSelect: (date) => {
  //       const formattedDate = formatDate(date);
  //       dateInput.current.value = formattedDate;
  //       updateRevenue('invoice_date', formattedDate);
  //     },
  //   });
  //   // Return a cleanup function.
  //   // React will call this prior to unmounting.
  //   return () => p.destroy();
  // }, []);

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the Revenue from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRevenue(revenue);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(revenue);
    }
  };

  return (
    <section>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="eventContainer">
          <h2>{title}</h2>
          {renderErrors()}
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="invoice_num"
                  name="invoice_num"
                  label="Invoice Number"
                  onChange={handleInputChange}
                  value={revenue.invoice_num}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                  />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  type="text"
                  id="invoice_date"
                  name="invoice_date"
                  label="Invoice Date (yyyy-mm-dd)"
                  ref={dateInput}
                  autoComplete="off"
                  value={revenue.invoice_date}
                  onChange={handleInputChange}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid> */}
              <Grid item xs={6}>
                <DatePicker
                  type="text"
                  id="invoice_date"
                  name="invoice_date"
                  label="Invoice Date"
                  inputFormat="yyyy-MM-dd"
                  onChange={handleDateInputChange}
                  value={revenue.invoice_date}
                  // Use onKeyDown to disable typing in the date field
                  // renderInput={
                  //   (params) =>
                  // <TextField size="small" fullWidth required onKeyDown={onKeyDown} {...params} />
                  // }
                  renderInput={
                    (params) => <TextField size="small" fullWidth required {...params} />
                  }
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
                  onChange={handleNumberInputChange}
                  value={revenue.amount}
                  size="small"
                  fullWidth
                  thousandSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="$ "
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Account Number *</InputLabel>
                  <Select
                    id="account_id"
                    name="account_id"
                    label="Account Number"
                    onChange={handleInputChange}
                    native
                    value={revenue.account_id}
                    required
                  >
                    <option value=""> </option>
                    {accounts.map((account) => (
                      <option
                        key={account.id}
                        value={account.id}
                      >
                        {account.account_num}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Revenue Category *</InputLabel>
                  <Select
                    id="revenue_category_id"
                    name="revenue_category_id"
                    label="Revenue Category"
                    onChange={handleInputChange}
                    native
                    value={revenue.revenue_category_id || ''}
                    required
                  >
                    <option value=""> </option>
                    {revenueCategories.map((revenueCategory) => (
                      <option
                        key={revenueCategory.id}
                        value={revenueCategory.id}
                      >
                        {revenueCategory.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Revenue Currency *</InputLabel>
                  <Select
                    id="revenue_currency"
                    name="revenue_currency"
                    label="Revenue Currency"
                    onChange={handleInputChange}
                    native
                    value={revenue.revenue_currency || ''}
                    required
                  >
                    <option value=""> </option>
                    <option key="CAD" value="CAD">CAD</option>
                    <option key="USD" value="USD">USD</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="notes"
                  name="notes"
                  label="Notes"
                  onChange={handleInputChange}
                  value={revenue.notes || ''}
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
                    component={Link} to={cancelURL}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      width: 100,
                      height: 40,
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </div>
          </FormControl>
        </form>
      </LocalizationProvider>
    </section>
  );
};

export default RevenueForm;

RevenueForm.propTypes = {
  revenues: PropTypes.arrayOf(
    PropTypes.shape({
      // invoice_num: PropTypes.string.isRequired,
      // invoice_date: PropTypes.string.isRequired,
      // amount: PropTypes.number.isRequired,
      // account_num: PropTypes.string.isRequired,
      // revenue_category_name: PropTypes.string.isRequired,
    }),
  ),
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      // account_num: PropTypes.string.isRequired,
    }),
  ).isRequired,
  revenueCategories: PropTypes.arrayOf(
    PropTypes.shape({
      // revenue_category_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

RevenueForm.defaultProps = {
  revenues: [],
};
