import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button, InputLabel, Select } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';

const Account = ({ accounts, onDelete }) => {
  const { id } = useParams();
  const account = accounts.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {account.account_num}
        {' - '}
        {account.study_title}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="account_num"
              label="Account Number"
              value={account.account_num}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="muhc_account"
              label="MUHC Account"
              value={account.muhc_account ? account.muhc_account : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="study_title"
              label="Study Title"
              value={account.study_title ? account.study_title : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="study_name"
              label="Study Name"
              value={account.study_name ? account.study_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="sponsor_name"
              label="Sponsor Name"
              value={account.sponsor_name ? account.sponsor_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="sponsor_contact"
              label="Sponsor Contact"
              value={account.sponsor_contact ? account.sponsor_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="num_of_patients"
              label="Number of Patients"
              value={account.number_of_patients || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cta_date"
              label="CTA Date (yyyy-mm-dd)"
              value={account.cta_date ? account.cta_date : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="phase"
              label="Phase"
              value={account.phase ? account.phase : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cim_contact"
              label="CIM Contact"
              value={account.cim_contact ? account.cim_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cro_name"
              label="CRO Name"
              value={account.cro_name ? account.cro_name : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cro_contact"
              label="CRO Contact"
              value={account.cro_contact ? account.cro_contact : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="budget_version"
              label="Budget Version"
              value={account.budget_version ? account.budget_version : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
              id="budget_currency"
              label="Budget Currency"
              value={account.budget_currency ? account.budget_currency : ''}
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
                value={account.budget_currency || ''}
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
              value={account.invoicing_terms ? account.invoicing_terms : ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="notes"
              label="Notes"
              value={account.notes ? account.notes : ''}
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
                onClick={() => onDelete(account.id)}
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
                component={Link} to={`/accounts/${account.id}/edit`}
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

Account.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    account_num: PropTypes.string,
    muhc_account: PropTypes.string,
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

export default Account;
