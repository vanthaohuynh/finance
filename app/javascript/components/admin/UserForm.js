import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate, isEmptyObject, validateUser } from '../../helpers/helpers';

const UserForm = ({
  users,
  roles,
  onSave,
}) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialUserState = useCallback(
    () => {
      const defaults = {
        id: '',
        email: '',
        role_id: '',
        password: '',
        password_confirmation: '',
        role_name: '',
      };

      const currUser = id ? users.find((e) => e.id === Number(id)) : {};
      // if (!isEmptyObject(currUser)) {
      //   // Need to replace - with / to fix problem with Javascript Date object off by one day
      //   currUser.invoice_date = currUser.invoice_date.replace(/-/g, '\/');
      //   if (currUser.deposit_date) {
      //     currUser.deposit_date = currUser.deposit_date.replace(/-/g, '\/');
      //   }
      // }
      return { ...defaults, ...currUser };
    },
    [users, id],
  );
  // **************************************************************************

  const [user, setUser] = useState(initialUserState);
  const [formErrors, setFormErrors] = useState({});
  const cancelURL = user.id ? `/users/${user.id}` : '/users';
  const title = user.id ? `${user.email}` : 'New User';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep expenses in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setUser(initialUserState);
  }, [users]); // Please ignore eslint warning. Need to keep it that way
  // but pay attention as it may cause problems in the future: because:
  // some changes may not be reflected in the UI
  // **************************************************************************

  const updateUser = (key, value) => {
    console.log('updateUser - key - value:', key, value);
    console.log('type of value:', typeof value);
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateUser(name, val);
  };

  const handleRoleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value);
    updateUser(name, val);
    // updateUser('role_name', roles.find((r) => r.id === Number(val)).name);
    const role = roles.find((r) => r.id === Number(val));
    updateUser('role_name', role.name);
  };

  const handleAmountInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = Number(target.value.replace(/[^0-9.]/g, ''));
    updateUser(name, val);
    if (isChecked) {
      const overheadTemp = val * 0.3;
      updateUser('overhead', overheadTemp);
      const afterOverheadTemp = val - overheadTemp;
      updateUser('after_overhead', afterOverheadTemp);
    }
  };

  const handleDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateUser('invoice_date', formatDate(val));
  };

  const handleDepositDateInputChange = (val) => {
    if (val === 'Invalid Date' || val === null) {
      return;
    }
    updateUser('deposit_date', formatDate(val));
  };

  const handleAccountInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateUser(name, val);
    const account = accounts.find((a) => a.id === Number(val));
    updateUser('account_num', account.account_num);
  };

  const handleCategoryInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateUser(name, val);
    const category = userCategories.find((c) => c.id === Number(val));
    updateUser('user_category_name', category.name);
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the User from being saved:</h3>
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
    const errors = validateUser(user);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      console.log('UserForm handleSubmit user: ', user);
      onSave(user);
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
                  <TextField
                    type="text"
                    id="email"
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={user.email}
                    size="small"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    id="password"
                    name="password"
                    label="Password"
                    onChange={handleInputChange}
                    value={user.password || ''}
                    size="small"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Password Confirmation"
                    onChange={handleInputChange}
                    value={user.password_confirmation || ''}
                    size="small"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Role ID</InputLabel>
                    <Select
                      id="role_id"
                      name="role_id"
                      label="Role ID"
                      onChange={handleRoleInputChange}
                      native
                      value={user.role_id}
                      required
                    >
                      <option value=""> </option>
                      {roles.map((role) => (
                        <option
                          key={role.id}
                          value={role.id}
                        >
                          {role.id} ({role.name})
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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

UserForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      // invoice_num: PropTypes.string.isRequired,
      // invoice_date: PropTypes.string.isRequired,
      // amount: PropTypes.number.isRequired,
      // account_num: PropTypes.string.isRequired,
      // user_category_name: PropTypes.string.isRequired,
    }),
  ),
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  users: [],
};

export default UserForm;
