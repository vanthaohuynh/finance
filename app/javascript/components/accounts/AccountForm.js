import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';
// import Stack from '@mui/material/Stack';
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
import { NumericFormat } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateAccount } from '../../helpers/helpers';
import AmendmentForm from './AmendmentForm';
// import { NumericFormat } from 'react-number-format';

const AccountForm = ({ accounts, onSave }) => {
  const { id } = useParams();

  const initialAccountState = useCallback(
    () => {
      const defaults = {
        account_num: '',
        status: 'Open',
        study_title: '',
        pi_name: '',
        sponsor_name: '',
        sponsor_contact: '',
        targeted_enrolling_number: '',
        cta_date: null,
        phase: '',
        cim_contact: '',
        cro_name: '',
        cro_contact: '',
        budget_version: '',
        budget_currency: '',
        invoicing_terms: '',
        notes: '',
      };

      const currAccount = id ? accounts.find((e) => e.id === Number(id)) : {};
      if (!isEmptyObject(currAccount) && currAccount.cta_date !== null) {
        // Need to replace - with / to fix problem with Javascript Date object off by one day
        currAccount.cta_date = currAccount.cta_date.replace(/-/g, '\/');
      }
      return { ...defaults, ...currAccount };
    },
    [accounts, id],
  );

  const [account, setAccount] = useState(initialAccountState);
  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);
  const cancelURL = account.id ? `/accounts/${account.id}` : '/accounts';
  const title = account.id ? `${account.account_num} - ${account.study_title}` : 'New Account';

  useEffect(() => {
    setAccount(initialAccountState);
  }, [accounts]);

  const updateAccount = (key, value) => {
    setAccount((prevAccount) => ({ ...prevAccount, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // const value = target.value;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // setAccount({ ...account, [name]: value });
    updateAccount(name, value);
  };

  const handleNumberInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateAccount(name, val);
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date') {
      return;
    }
    if (val !== null) {
      updateAccount('cta_date', formatDate(val));
    } else {
      updateAccount('cta_date', '');
    }
  };

  // useEffect(() => {
  //   const p = new Pikaday({
  //     field: dateInput.current,
  //     toString: (date) => formatDate(date),
  //     onSelect: (date) => {
  //       const formattedDate = formatDate(date);
  //       dateInput.current.value = formattedDate;
  //       updateAccount('cta_date', formattedDate);
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
        <h3>The following errors prohibited the Account from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAccount(account);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(account);
    }
  };

  const onAddAmendment = (amendment) => {
    console.log('amendment:', amendment);
    // const newAccount = { ...account };
    // newAccount.amendments.push(amendment);
    // setAccount(newAccount);
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
                  id="account_num"
                  name="account_num"
                  label="Account Number"
                  onChange={handleInputChange}
                  // The following || '' is to prevent the controlled component warning
                  // Need to keep it there because the value can be null
                  value={account.account_num || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="study_title"
                  name="study_title"
                  label="Study Title"
                  onChange={handleInputChange}
                  value={account.study_title || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="pi_name"
                  name="pi_name"
                  label="PI Name"
                  onChange={handleInputChange}
                  value={account.pi_name || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="sponsor_name"
                  name="sponsor_name"
                  label="Sponsor Name"
                  onChange={handleInputChange}
                  value={account.sponsor_name || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    type="text"
                    id="status"
                    name="status"
                    label="Status"
                    onChange={handleInputChange}
                    value={account.status || 'Open'}
                    variant="outlined"
                    native
                    disabled={account.status === 'Closed'}
                  >
                    <option key="open" value="Open">Open</option>
                    <option key="closed" value="Closed">Closed</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="sponsor_contact"
                  name="sponsor_contact"
                  label="Sponsor Contact"
                  onChange={handleInputChange}
                  value={account.sponsor_contact || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="cim_contact"
                  name="cim_contact"
                  label="CIM Contact"
                  onChange={handleInputChange}
                  value={account.cim_contact || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="cro_name"
                  name="cro_name"
                  label="CRO Name"
                  onChange={handleInputChange}
                  value={account.cro_name || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="cro_contact"
                  name="cro_contact"
                  label="CRO Contact"
                  onChange={handleInputChange}
                  value={account.cro_contact || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="phase"
                  name="phase"
                  label="Phase"
                  onChange={handleInputChange}
                  value={account.phase || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Budget Currency</InputLabel>
                  <Select
                    type="text"
                    id="budget_currency"
                    name="budget_currency"
                    label="Budget Currency"
                    onChange={handleInputChange}
                    value={account.budget_currency || ''}
                    variant="outlined"
                    native
                  >
                    <option> </option>
                    <option key="CAD" value="CAD">CAD</option>
                    <option key="USD" value="USD">USD</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="invoicing_terms"
                  name="invoicing_terms"
                  label="Invoicing Terms"
                  onChange={handleInputChange}
                  value={account.invoicing_terms || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="budget_version"
                  name="budget_version"
                  label="Budget Version"
                  onChange={handleInputChange}
                  value={account.budget_version || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <NumericFormat
                  id="targeted_enrolling_number"
                  name="targeted_enrolling_number"
                  variant="outlined"
                  label="Targeted Enrolling Number"
                  customInput={TextField}
                  type="text"
                  onChange={handleNumberInputChange}
                  value={account.targeted_enrolling_number || ''}
                  size="small"
                  fullWidth
                  thousandSeparator=","
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  type="text"
                  id="cta_date"
                  name="cta_date"
                  label="CTA Date"
                  inputFormat="yyyy-MM-dd"
                  onChange={handleDateInputChange}
                  value={account.cta_date}
                  renderInput={
                    (params) => <TextField size="small" fullWidth {...params} />
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="notes"
                  name="notes"
                  label="Notes"
                  onChange={handleInputChange}
                  value={account.notes || ''}
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
                  {/* <Button
                    sx={{
                      width: 175,
                      height: 40,
                    }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    // component={Link} to={`/accounts/${account.id}/edit`}
                  >
                    Add Amendment
                  </Button> */}
                </Stack>
              </Grid>
            </div>
          </FormControl>
        </form>
      </LocalizationProvider>
    </section>
  );
};

export default AccountForm;

AccountForm.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      account_num: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

AccountForm.defaultProps = {
  accounts: [],
};
