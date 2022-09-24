import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { formatDate, isEmptyObject, validateAccount } from '../../helpers/helpers';
// import { NumericFormat } from 'react-number-format';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AccountForm = ({ accounts, onSave }) => {
  const { id } = useParams();

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

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateAccount('cta_date', formattedDate);
      },
    });
    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);

  useEffect(() => {
    setAccount(initialAccountState);
  }, [accounts]);

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

  return (
    <section>
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
                value={account.account_num || ''}
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
                onChange={handleInputChange}
                value={account.muhc_account || ''}
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
                id="study_name"
                name="study_name"
                label="Study Name"
                onChange={handleInputChange}
                value={account.study_name || ''}
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
                id="number_of_patients"
                name="number_of_patients"
                label="Number of Patients"
                onChange={handleInputChange}
                value={account.number_of_patients || ''}
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="cta_date"
                name="cta_date"
                label="CTA Date (YYYY-MM-DD)"
                ref={dateInput}
                autoComplete="off"
                value={account.cta_date || ''}
                onChange={handleInputChange}
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
              <TextField
                type="text"
                id="budget_currency"
                name="budget_currency"
                label="Budget Currency"
                onChange={handleInputChange}
                value={account.budget_currency || ''}
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
