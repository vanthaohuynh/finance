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
import { isEmptyObject, validateExpenseCategory } from '../../../helpers/helpers';

const ExpenseCatForm = ({ expenseCategories, onSave }) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialExpenseCatState = useCallback(
    () => {
      const defaults = {
        name: '',
        description: '',
      };

      const currExpenseCat = id ? expenseCategories.find((e) => e.id === Number(id)) : {};
      // if (!isEmptyObject(currExpenseCat)) {
      //   // Need to replace - with / to fix problem with Javascript Date object off by one day
      //   currExpenseCat.invoice_date = currExpenseCat.invoice_date.replace(/-/g, '\/');
      // }
      return { ...defaults, ...currExpenseCat };
    },
    [expenseCategories, id],
  );
  // **************************************************************************

  const [expenseCategory, setExpenseCategory] = useState(initialExpenseCatState);
  const [formErrors, setFormErrors] = useState({});
  const cancelURL = expenseCategory.id ? `/expense_categories/${expenseCategory.id}` : '/expense_categories';
  const title = expenseCategory.id ? `${expenseCategory.name}` : 'New Expense Category';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep expenses in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setExpenseCategory(initialExpenseCatState);
  }, [expenseCategories]); // Please ignore eslint warning. Need to keep it that way
  // **************************************************************************

  const updateExpenseCategory = (key, value) => {
    setExpenseCategory((prevExpenseCat) => ({ ...prevExpenseCat, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateExpenseCategory(name, val);
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the Expense from being saved:</h3>
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
    const errors = validateExpenseCategory(expenseCategory);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(expenseCategory);
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
                  value={expenseCategory.name}
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
                  value={expenseCategory.description || ''}
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

ExpenseCatForm.propTypes = {
  expenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      // expense_category_name: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

ExpenseCatForm.defaultProps = {
  expenseCategories: [],
};

export default ExpenseCatForm;
