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
        {revenue.revenue_num}
        {' - '}
        {revenue.study_title}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="revenue_num"
              label="Revenue Number"
              value={revenue.revenue_num}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="muhc_revenue"
              label="MUHC Revenue"
              value={revenue.muhc_revenue ? revenue.muhc_revenue : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="study_title"
              label="Study Title"
              value={revenue.study_title ? revenue.study_title : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="study_name"
              label="Study Name"
              value={revenue.study_name ? revenue.study_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="sponsor_name"
              label="Sponsor Name"
              value={revenue.sponsor_name ? revenue.sponsor_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="sponsor_contact"
              label="Sponsor Contact"
              value={revenue.sponsor_contact ? revenue.sponsor_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="num_of_patients"
              label="Number of Patients"
              value={revenue.number_of_patients || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cta_date"
              label="CTA Date (yyyy-mm-dd)"
              value={revenue.cta_date ? revenue.cta_date : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="phase"
              label="Phase"
              value={revenue.phase ? revenue.phase : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cim_contact"
              label="CIM Contact"
              value={revenue.cim_contact ? revenue.cim_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cro_name"
              label="CRO Name"
              value={revenue.cro_name ? revenue.cro_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cro_contact"
              label="CRO Contact"
              value={revenue.cro_contact ? revenue.cro_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="budget_version"
              label="Budget Version"
              value={revenue.budget_version ? revenue.budget_version : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
              id="budget_currency"
              label="Budget Currency"
              value={revenue.budget_currency ? revenue.budget_currency : ''}
              size="small"
              fullWidth
              variant="outlined"
            /> */}
            <FormControl fullWidth size="small">
              <InputLabel>Budget Currency</InputLabel>
              <Select
                type="text"
                id="budget_currency"
                name="budget_currency"
                label="Budget Currency"
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
              id="invoicing_terms"
              label="Invoicing Terms"
              value={revenue.invoicing_terms ? revenue.invoicing_terms : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="notes"
              label="Notes"
              value={revenue.notes ? revenue.notes : ''}
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
                component={Link} to={`/revenues/${revenue.id}/edit`}
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
    id: PropTypes.number,
    revenue_num: PropTypes.string,
    muhc_revenue: PropTypes.string,
    study_title: PropTypes.string,
    study_name: PropTypes.string,
    sponsor_name: PropTypes.string,
    sponsor_contact: PropTypes.string,
    number_of_patients: PropTypes.number,
    cta_date: PropTypes.string,
    phase: PropTypes.string,
    cim_contact: PropTypes.string,
    cro_name: PropTypes.string,
    cro_contact: PropTypes.string,
    budget_version: PropTypes.string,
    budget_currency: PropTypes.string,
    invoicing_terms: PropTypes.string,
    notes: PropTypes.string,
    created_at: PropTypes.string,
    // updated_at: PropTypes.string,
  })).isRequired,
};

export default Revenue;
