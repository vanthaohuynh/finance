import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Stack,
} from '@mui/material';
import { isEmptyObject, validateRevenueCategory } from '../../../helpers/helpers';

const RevenueCatForm = ({ revenueCategories, onSave }) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialRevenueCatState = useCallback(
    () => {
      const defaults = {
        name: '',
        description: '',
      };

      const currRevenueCat = id ? revenueCategories.find((e) => e.id === Number(id)) : {};
      // if (!isEmptyObject(currRevenueCat)) {
      //   // Need to replace - with / to fix problem with Javascript Date object off by one day
      //   currRevenueCat.invoice_date = currRevenueCat.invoice_date.replace(/-/g, '\/');
      // }
      return { ...defaults, ...currRevenueCat };
    },
    [revenueCategories, id],
  );
  // **************************************************************************

  const [revenueCategory, setRevenueCategory] = useState(initialRevenueCatState);
  const [formErrors, setFormErrors] = useState({});
  const cancelURL = revenueCategory.id ? `/revenue_categories/${revenueCategory.id}` : '/revenue_categories';
  const title = revenueCategory.id ? `${revenueCategory.name}` : 'New Revenue Category';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep revenues in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setRevenueCategory(initialRevenueCatState);
  }, [revenueCategories]); // Please ignore eslint warning. Need to keep it that way
  // **************************************************************************

  const updateRevenueCategory = (key, value) => {
    setRevenueCategory((prevRevenueCat) => ({ ...prevRevenueCat, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateRevenueCategory(name, val);
  };

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
    const errors = validateRevenueCategory(revenueCategory);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(revenueCategory);
    }
  };

  return (
    <section>
      <div className="eventContainer">
        <h2>{title}</h2>
        {renderErrors()}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  onChange={handleInputChange}
                  value={revenueCategory.name}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="description"
                  name="description"
                  label="Description"
                  onChange={handleInputChange}
                  value={revenueCategory.description || ''}
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
    </section>
  );
};

RevenueCatForm.propTypes = {
  revenueCategories: PropTypes.arrayOf(
    PropTypes.shape({
      // revenue_category_name: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

RevenueCatForm.defaultProps = {
  revenueCategories: [],
};

export default RevenueCatForm;
