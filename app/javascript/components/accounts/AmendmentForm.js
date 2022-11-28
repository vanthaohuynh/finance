import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';
// import Stack from '@mui/material/Stack';
import 'pikaday/css/pikaday.css';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Stack,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateAmendment } from '../../helpers/helpers';
// import { NumericFormat } from 'react-number-format';

const AmendmentForm = ({ amendmentList, account, onCancel, onSave }) => {
  // const { id } = useParams();
  const accountID = account.id;
  // const accountNum = account.account_num;
  // const studyName = account.study_name;
  let newCount = 1;
  // const [newCount, setNewCount] = useState(1);

  if (amendmentList.length > 0) {
    newCount = amendmentList.length + 1;
  }

  const [amendment, setAmendment] = useState({});
  const [formErrors, setFormErrors] = useState({});
  // const cancelURL = account.id ? `/accounts/${account.id}` : '/accounts';
  const title = `New Amendment # ${newCount}`;

  const updateAmendment = (key, value) => {
    setAmendment((prevAmendment) => ({ ...prevAmendment, [key]: value }));
  };

  useEffect(() => {
    // setAmendment(initialAmendmentState);
    updateAmendment('account_id', accountID);
    updateAmendment('count', newCount);
  }, [accountID, newCount]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // const value = target.value;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // setAccount({ ...account, [name]: value });
    updateAmendment(name, value);
  };

  const handleNumberInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateAmendment(name, val);
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date') {
      return;
    }
    if (val !== null) {
      updateAmendment('cta_date', formatDate(val));
    } else {
      updateAmendment('cta_date', '');
    }
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the Account Amendment from being saved:</h3>
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
    const errors = validateAmendment(amendment);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(amendment);
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
                  id="budget_version"
                  name="budget_version"
                  label="Budget Version"
                  onChange={handleInputChange}
                  value={amendment.budget_version || ''}
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
                  value={amendment.targeted_enrolling_number || ''}
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
                  value={amendment.cta_date || null}
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
                  value={amendment.notes || ''}
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
                    onClick={onCancel}
                    // component={Link}
                    // to={cancelURL}
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

export default AmendmentForm;

AmendmentForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    // account_num: PropTypes.string,
    // study_name: PropTypes.string,
    // cta_date: PropTypes.string,
    // notes: PropTypes.string,
    // targeted_enrolling_number: PropTypes.number,
    // budget_version: PropTypes.string,
  }).isRequired,
  amendmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    count: PropTypes.number,
    account_id: PropTypes.number,
    cta_date: PropTypes.string,
    notes: PropTypes.string,
    targeted_enrolling_number: PropTypes.number,
    budget_version: PropTypes.string,
    // account_num: PropTypes.string,
    // study_title: PropTypes.string,
  })),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

AmendmentForm.defaultProps = {
  amendmentList: [],
};
