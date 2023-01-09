import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
// import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateRevenue } from '../../helpers/helpers';

const RevenueForm = ({
  revenues,
  accounts,
  revenueCategories,
  onSave,
}) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialRevenueState = useCallback(
    () => {
      const defaults = {
        invoice_date: null,
        deposit_date: null,
        invoice_num: '',
        amount: '',
        account_id: '',
        revenue_category_id: '',
        revenue_currency: '',
        notes: '',
        overhead: '',
        after_overhead: '',
        account_num: '',
        revenue_category_name: '',
        calculate_over_head: false,
      };

      const currRevenue = id ? revenues.find((e) => e.id === Number(id)) : {};
      if (!isEmptyObject(currRevenue)) {
        // Need to replace - with / to fix problem with Javascript Date object off by one day
        currRevenue.invoice_date = currRevenue.invoice_date.replace(/-/g, '\/');
        if (currRevenue.deposit_date) {
          currRevenue.deposit_date = currRevenue.deposit_date.replace(/-/g, '\/');
        }
      }
      return { ...defaults, ...currRevenue };
    },
    [revenues, id],
  );
  // **************************************************************************

  const [revenue, setRevenue] = useState(initialRevenueState);
  const [formErrors, setFormErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  // const dateInput = useRef(null);
  const cancelURL = revenue.id ? `/revenues/${revenue.id}` : '/revenues';
  const title = revenue.id ? `${revenue.invoice_num}` : 'New Revenue';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep expenses in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setRevenue(initialRevenueState);
  }, [revenues]); // Please ignore eslint warning. Need to keep it that way
  // but pay attention as it may cause problems in the future: because:
  // some changes may not be reflected in the UI
  // **************************************************************************

  const updateRevenue = (key, value) => {
    setRevenue((prevRevenue) => ({ ...prevRevenue, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateRevenue(name, val);
  };

  const handleAmountInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateRevenue(name, val);
    if (isChecked) {
      const overheadTemp = val * 0.3;
      updateRevenue('overhead', overheadTemp);
      const afterOverheadTemp = val - overheadTemp;
      updateRevenue('after_overhead', afterOverheadTemp);
    }
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateRevenue('invoice_date', formatDate(val));
  };

  const handleDepositDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateRevenue('deposit_date', formatDate(val));
  };

  const handleAccountInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateRevenue(name, val);
    const account = accounts.find((a) => a.id === Number(val));
    updateRevenue('account_num', account.account_num);
  };

  const handleCategoryInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateRevenue(name, val);
    const category = revenueCategories.find((c) => c.id === Number(val));
    updateRevenue('revenue_category_name', category.name);
  };

  const handleCheckboxInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.checked;
    // console.log('val', val);
    updateRevenue(name, val);
    setIsChecked(val);
    if (val === true) {
      const overheadTemp = revenue.amount * 0.3;
      updateRevenue('overhead', overheadTemp);
      const afterOverheadTemp = revenue.amount - overheadTemp;
      updateRevenue('after_overhead', afterOverheadTemp);
    } else {
      updateRevenue('overhead', '');
      updateRevenue('after_overhead', '');
    }
  };

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

  // Will use this function when need to disable typing in date field
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
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Account Number *</InputLabel>
                    <Select
                      id="account_id"
                      name="account_id"
                      label="Account Number"
                      onChange={handleAccountInputChange}
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
                <Grid item xs={6}>
                  <NumericFormat
                    id="amount"
                    name="amount"
                    variant="outlined"
                    label="Amount"
                    customInput={TextField}
                    type="text"
                    onChange={handleAmountInputChange}
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
                  <NumericFormat
                    id="overhead"
                    name="overhead"
                    variant="outlined"
                    label="Overhead"
                    customInput={TextField}
                    type="text"
                    // onChange={handleNumberInputChange}
                    value={revenue.overhead}
                    size="small"
                    fullWidth
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="$ "
                    disabled
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
                    // onChange={handleNumberInputChange}
                    value={revenue.after_overhead}
                    size="small"
                    fullWidth
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="$ "
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    type="text"
                    id="deposit_date"
                    name="deposit_date"
                    label="Deposit Date"
                    inputFormat="yyyy-MM-dd"
                    onChange={handleDepositDateInputChange}
                    // value={revenue.deposit_date ? revenue.deposit_date : null}
                    value={revenue.deposit_date}
                    renderInput={
                      (params) => <TextField size="small" fullWidth {...params} />
                    }
                  />
                </Grid>
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
                  <FormControl size="small" fullWidth>
                    <InputLabel>Revenue Category *</InputLabel>
                    <Select
                      id="revenue_category_id"
                      name="revenue_category_id"
                      label="Revenue Category"
                      onChange={handleCategoryInputChange}
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
                {/* <Grid item xs={6}>
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
                </Grid> */}
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
                <Grid item xs={6}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        id="calculate_over_head"
                        name="calculate_over_head"
                        onChange={handleCheckboxInputChange}
                        checked={revenue.calculate_over_head || false}
                      />
                    )}
                    label="Calculate Overhead"
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
                      component={Link}
                      to={cancelURL}
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
        </div>
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
