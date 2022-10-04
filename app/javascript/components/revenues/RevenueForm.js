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
  OutlinedInput,
} from '@mui/material';
import { formatDate, isEmptyObject, validateRevenue } from '../../helpers/helpers';
// import { NumericFormat } from 'react-number-format';

const RevenueForm = ({ revenues, onSave }) => {
  const { id } = useParams();

  const initialRevenueState = useCallback(
    () => {
      const defaults = {
        revenue_num: '',
        muhc_revenue: '',
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

      const currRevenue = id ? revenues.find((e) => e.id === Number(id)) : {};
      return { ...defaults, ...currRevenue };
    },
    [revenues, id],
  );

  const [revenue, setRevenue] = useState(initialRevenueState);
  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);
  const cancelURL = revenue.id ? `/revenues/${revenue.id}` : '/revenues';
  const title = revenue.id ? `${revenue.revenue_num} - ${revenue.study_title}` : 'New Revenue';

  useEffect(() => {
    setRevenue(initialRevenueState);
  }, [revenues]);

  const updateRevenue = (key, value) => {
    setRevenue((prevRevenue) => ({ ...prevRevenue, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // const value = target.value;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // setRevenue({ ...revenue, [name]: value });
    updateRevenue(name, value);
  };

  const handleNumberInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // const value = target.value;
    const value = Number(target.value);

    // setRevenue({ ...revenue, [name]: value });
    updateRevenue(name, value);
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateRevenue('cta_date', formattedDate);
      },
    });
    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);

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
                id="revenue_num"
                name="revenue_num"
                label="Revenue Number"
                onChange={handleInputChange}
                value={revenue.revenue_num || ''}
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="muhc_revenue"
                name="muhc_revenue"
                label="MUHC Revenue"
                onChange={handleInputChange}
                value={revenue.muhc_revenue || ''}
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
                value={revenue.study_title || ''}
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
                value={revenue.study_name || ''}
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
                value={revenue.sponsor_name || ''}
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
                value={revenue.sponsor_contact || ''}
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
                onChange={handleNumberInputChange}
                value={revenue.number_of_patients || ''}
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
                label="CTA Date (yyyy-mm-dd)"
                ref={dateInput}
                autoComplete="off"
                value={revenue.cta_date || ''}
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
                value={revenue.phase || ''}
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
                value={revenue.cim_contact || ''}
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
                value={revenue.cro_name || ''}
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
                value={revenue.cro_contact || ''}
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
                value={revenue.budget_version || ''}
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
                  value={revenue.budget_currency || ''}
                  variant="outlined"
                  native
                >
                  <option></option>
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
                value={revenue.invoicing_terms || ''}
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
                value={revenue.notes || ''}
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

export default RevenueForm;

RevenueForm.propTypes = {
  revenues: PropTypes.arrayOf(
    PropTypes.shape({
      revenue_num: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

RevenueForm.defaultProps = {
  revenues: [],
};
