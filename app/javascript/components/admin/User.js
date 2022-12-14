import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';

const User = ({ users, onDelete }) => {
  const { id } = useParams();
  const user = users.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {user.email}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={user.email || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="role_id"
              label="Role ID"
              // value={user.role_id ? `${user.role_id} (${user.role_name})` : ''}
              value={`${user.role_id} (${user.role_name})`}
              // value={user.role_id && user.role_name ? `${user.role_id} (${user.role_name})` : ''}
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
                onClick={() => onDelete(user.id)}
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
                to={`/users/${user.id}/edit`}
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

User.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    role_id: PropTypes.number.isRequired,
    role_name: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default User;
