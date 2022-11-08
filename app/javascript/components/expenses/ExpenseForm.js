import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
// import Pikaday from 'pikaday';
// import 'pikaday/css/pikaday.css';
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
// import { Label } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateExpense } from '../../helpers/helpers';

const ExpenseForm = ({
  expenses,
  accounts,
  expenseCategories,
  onSave,
}) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialExpenseState = useCallback(
    () => {
      const defaults = {
        invoice_date: null,
        invoice_num: '',
        amount: '',
        account_id: '',
        expense_category_id: '',
        expense_currency: 'CAD',
        notes: '',
        // pdf_invoice: null,
      };

      const currExpense = id ? expenses.find((e) => e.id === Number(id)) : {};
      if (!isEmptyObject(currExpense)) {
        // Need to replace - with / to fix problem with Javascript Date object off by one day
        currExpense.invoice_date = currExpense.invoice_date.replace(/-/g, '\/');
      }
      return { ...defaults, ...currExpense };
    },
    [expenses, id],
  );
  // **************************************************************************

  const [expense, setExpense] = useState(initialExpenseState);
  const [formErrors, setFormErrors] = useState({});
  // const dateInput = useRef(null);
  const cancelURL = expense.id ? `/expenses/${expense.id}` : '/expenses';
  const title = expense.id ? `${expense.invoice_num}` : 'New Expense';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep expenses in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setExpense(initialExpenseState);
  }, [expenses]); // Please ignore eslint warning. Need to keep it that way
  // **************************************************************************

  const updateExpense = (key, value) => {
    setExpense((prevExpense) => ({ ...prevExpense, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateExpense(name, val);
  };

  const handleNumberInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateExpense(name, val);
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateExpense('invoice_date', formatDate(val));
  };

  // useEffect(() => {
  //   const p = new Pikaday({
  //     field: dateInput.current,
  //     toString: (date) => formatDate(date),
  //     onSelect: (date) => {
  //       const formattedDate = formatDate(date);
  //       dateInput.current.value = formattedDate;
  //       updateExpense('invoice_date', formattedDate);
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
        <h3>The following errors prohibited the Expense from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Will use this function when need to disable typing in date field
  // const onKeyDown = (e) => {
  //   e.preventDefault();
  // };

  // const handleFileInputChange = (e) => {
  //   const { target } = e;
  //   const { files } = target;
  //   const file = files[0];
  //   console.log('file: ', file);
  //   updateExpense('pdf_invoice', file);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateExpense(expense);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(expense);
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
                  value={expense.invoice_num}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
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
                  value={expense.invoice_date}
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
                  value={expense.amount}
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
                    value={expense.account_id}
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
                  <InputLabel>Expense Category *</InputLabel>
                  <Select
                    id="expense_category_id"
                    name="expense_category_id"
                    label="Expense Category"
                    onChange={handleInputChange}
                    native
                    value={expense.expense_category_id || ''}
                    required
                  >
                    <option value=""> </option>
                    {expenseCategories.map((expenseCategory) => (
                      <option
                        key={expenseCategory.id}
                        value={expenseCategory.id}
                      >
                        {expenseCategory.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="expense_currency"
                  name="expense_currency"
                  label="Expense Currency"
                  onChange={handleInputChange}
                  value={expense.expense_currency || 'CAD'}
                  size="small"
                  fullWidth
                  variant="outlined"
                  disabled
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="notes"
                  name="notes"
                  label="Notes"
                  onChange={handleInputChange}
                  value={expense.notes || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  type="text"
                  id="pdf_invoice"
                  name="pdf_invoice"
                  label="PDF Invoice"
                  // onChange={handleFileInputChange}
                  value={expense.pdf_invoice ? expense.pdf_invoice.name : ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid> */}
            </Grid>
            <div className="button-mui">
              <Grid item xs={6}>
                <Stack spacing={2} direction="row">
                  {/* <Button
                    sx={{
                      width: 100,
                      height: 40,
                    }}
                    variant="outlined"
                    color="primary"
                    component="label"
                  >
                    Upload
                    <input
                      hidden
                      accept=".pdf"
                      type="file"
                      onChange={handleFileInputChange}
                      // style={{ display: 'none' }}
                    />
                  </Button> */}
                  <Button
                    sx={{
                      width: 100,
                      height: 40,
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
                  {/* <IconButton
                    color="primary"
                    aria-label="upload PDF"
                    component="label"
                  >
                    <input
                      hidden
                      accept=".pdf"
                      multiple
                      type="file"
                      onChange={handleFileInputChange}
                    />
                    <PictureAsPdfIcon />
                  </IconButton> */}
                </Stack>
              </Grid>
            </div>
          </FormControl>
        </form>
      </LocalizationProvider>
    </section>
  );
};

export default ExpenseForm;

ExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      // invoice_num: PropTypes.string.isRequired,
      // invoice_date: PropTypes.string.isRequired,
      // amount: PropTypes.number.isRequired,
      // account_num: PropTypes.string.isRequired,
      // expense_category_name: PropTypes.string.isRequired,
    }),
  ),
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      // account_num: PropTypes.string.isRequired,
    }),
  ).isRequired,
  expenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      // expense_category_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  expenses: [],
};
