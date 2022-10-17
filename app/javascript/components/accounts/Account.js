import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import AccountAmendmentList from './AccountAmendmentList';
import AmendmentForm from './AmendmentForm';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';

const Account = ({ accounts, onDelete }) => {
  const { id } = useParams();
  const account = accounts.find((e) => e.id === Number(id));
  const [isShown, setIsShown] = useState(false);
  const [amendments, setAmendments] = useState([]);
  // const [amendmentList, setAmendmentList] = useState([]);
  const [isAmendment, setIsAmendment] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/account_amendments');

        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setAmendments(data);
      } catch (err) {
        handleAjaxError(err);
      }
      // setIsLoading(false);
    };

    fetchData();
  }, []);

  const amendmentList = amendments.filter((e) => e.account_id === Number(id));

  // if (amendmentList.length > 0) {
  // Don't know why the following line is giving error: too many re-renders
  // setIsAmendment(true);
  // }

  console.log('Amendments List', amendmentList);

  const showAmendmentForm = () => {
    setIsShown(!isShown);
  };

  const addAmendment = async (newAmendment) => {
    try {
      const response = await window.fetch('/api/v1/account_amendments', {
        method: 'POST',
        body: JSON.stringify(newAmendment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedAmendment = await response.json();
      const newAmendments = [...amendments, savedAmendment];
      setAmendments(newAmendments);
      // window.alert('Account Added!');
      success('Amendment Added!');
      showAmendmentForm();
      // navigate(`/accounts/${savedAccount.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };


  const updateAmendment = async (updatedAmendment) => {
    try {
      const response = await window.fetch(
        `/api/v1/account_amendments/${updatedAmendment.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedAmendment),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw Error(response.statusText);

      // const newAccounts = accounts;
      // const idx = newAccounts.findIndex((account) => account.id === updatedAccount.id);
      // newAccounts[idx] = updatedAccount;
      // setAccounts(newAccounts);

      const newAmendments = amendments;
      const idx = newAmendments.findIndex((amendment) => amendment.id === updatedAmendment.id);
      newAmendments[idx] = updatedAmendment;
      setAmendments(newAmendments);

      success('Amendment Updated!');
      // navigate(`/accounts/${updatedAccount.id}`);
      showAmendmentForm();
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <>
      <div className="eventContainer">
        <h2>
          {account.account_num}
          {' - '}
          {account.study_name}
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
                id="phase"
                label="Phase"
                value={account.phase ? account.phase : ''}
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
                id="budget_version"
                label="Budget Version"
                value={account.budget_version ? account.budget_version : ''}
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <NumericFormat
                type="text"
                id="num_of_patients"
                name="num_of_patients"
                variant="outlined"
                label="Number of Patients"
                customInput={TextField}
                value={account.number_of_patients || ''}
                size="small"
                fullWidth
                thousandSeparator=","
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="cta_date"
                label="CTA Date"
                value={account.cta_date ? account.cta_date.replace(/\//g, '-') : ''}
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
                  // onClick={() => onDelete(account.id)}
                  disabled
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
                  component={Link}
                  to={`/accounts/${account.id}/edit`}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    width: 175,
                    height: 40,
                  }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={showAmendmentForm}
                >
                  Add Amendment
                </Button>
              </Stack>
            </Grid>
          </div>
        </FormControl>
      </div>
      <div>
        {isAmendment && (
          <div className="eventlist">
            <AccountAmendmentList amendmentList={amendmentList} />
          </div>
        )}
      </div>
      <div>
        {isShown
        && (
          <AmendmentForm
            account={account}
            amendmentList={amendmentList}
            onCancel={showAmendmentForm}
            onSave={addAmendment}
          />
        )}
      </div>
    </>
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
  // amendments: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   account_id: PropTypes.number,
  //   account_num: PropTypes.string,
  //   budget_version: PropTypes.string,
  //   number_of_patients: PropTypes.number,
  //   cta_date: PropTypes.string,
  //   notes: PropTypes.string,
  // })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Account;
