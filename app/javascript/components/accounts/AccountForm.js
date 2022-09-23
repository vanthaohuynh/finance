import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isEmptyObject, validateAccountNew } from '../../helpers/helpers';

const AccountForm = ({ accounts, onSave }) => {
  const { id } = useParams();

  // const defaults = {
  //   account_num: '',
  //   muhc_account: '',
  //   study_title: '',
  //   study_name: '',
  //   sponsor_name: '',
  //   sponsor_contact: '',
  //   number_of_patients: '',
  //   cta_date: '',
  //   phase: '',
  //   cim_contact: '',
  //   cro_name: '',
  //   cro_contact: '',
  //   budget_version: '',
  //   budget_currency: '',
  //   invoicing_terms: '',
  //   notes: '',
  // };

  // const currAccount = id ? accounts.find((e) => e.id === Number(id)) : {};
  // const initialAccountState = { ...defaults, ...currAccount };

  const initialAccountState = useCallback(
    () => {
      const defaults = {
        account_num: '',
        muhc_account: '',
        study_title: '',
        study_name: '',
        sponsor_name: '',
        sponsor_contact: '',
        number_of_patients: '',
        cta_date: '',
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
      return { ...defaults, ...currAccount };
    },
    [accounts, id],
  );

  const [account, setAccount] = useState(initialAccountState);
  const [cta_date, setCtaDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setAccount(initialAccountState);
  }, [accounts]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // const value  = target.value;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setAccount({ ...account, [name]: value });
  };

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
    const errors = validateAccountNew(account);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(account);
    }
  };

  return (
    <section>
      {/* {renderErrors()} */}
      <div className="eventContainer">
        <h2>New Account</h2>
        {renderErrors()}
      </div>
      {/* <form className="eventForm" onSubmit={handleSubmit}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  value={account.account_num}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="muhc_account"
                  name="muhc_account"
                  label="MUHC Account"
                  value={account.muhc_account}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="study_title"
                  name="study_title"
                  label="Study Title"
                  value={account.study_title}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="study_name"
                  name="study_name"
                  label="Study Name"
                  value={account.study_name}
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
                  value={account.sponsor_name}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="sponsor_contact"
                  name="sponsor_contact"
                  label="Sponsor Contact"
                  value={account.sponsor_contact}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="number_of_patients"
                  name="number_of_patients"
                  label="Number of Patients"
                  value={account.number_of_patients}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  <DatePicker
                    id="cta_date"
                    name="cta_date"
                    inputFormat="yyyy-MM-dd"
                    label="CTA Date"
                    value={account.cta_date}
                    fullWidth
                    // newValue only use for datepicker
                    // onChange={event => setCtaDate(event.target.value)} // <== THIS IS not working
                    onChange={(newValue) => { setCtaDate(newValue); }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="phase"
                  name="phase"
                  label="Phase"
                  value={account.phase}
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
                  value={account.cim_contact}
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
                  value={account.cro_name}
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
                  value={account.cro_contact}
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
                  value={account.budget_version}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="budget_currency"
                  name="budget_currency"
                  label="Budget Currency"
                  value={account.budget_currency}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="invoicing_terms"
                  name="invoicing_terms"
                  label="Invoicing Terms"
                  value={account.invoicing_terms}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="notes"
                  name="notes"
                  label="Notes"
                  value={account.notes}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={6}>
                <NumericFormat
                  name="Balance"
                  variant="outlined"
                  label="Balance"
                  customInput={TextField}
                  type="text"
                  value={34567.50}
                  size="small"
                  fullWidth
                  thousandSeparator=","
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={'$'}
                />
              </Grid> */}
            </Grid>
            {/* <div className="form-actions"> */}
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

export default AccountForm;

AccountForm.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      account_num: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

AccountForm.defaultProps = {
  accounts: [],
};
