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
} from '@mui/material';
import { isEmptyObject, validateExpenseSubCategory } from '../../../helpers/helpers';

const ExpenseSubCatForm = ({ userRoleID, expenseCategories, expenseSubCategories, onSave }) => {
  const { id } = useParams();

  // **************************************************************************
  // This function is very important. Need to keep it that way or else it won't work.
  // Explain from web site:
  // https://hibbard.eu/rails-react-crud-app/#building-the-api
  const initialExpenseSubCatState = useCallback(
    () => {
      const defaults = {
        expense_code: '',
        description: '',
        expense_category_id: '',
        expense_category_name: '',
      };

      const currExpenseSubCat = id ? expenseSubCategories.find((e) => e.id === Number(id)) : {};
      // if (!isEmptyObject(currExpenseSubCat)) {
      //   // Need to replace - with / to fix problem with Javascript Date object off by one day
      //   currExpenseSubCat.invoice_date = currExpenseSubCat.invoice_date.replace(/-/g, '\/');
      // }
      return { ...defaults, ...currExpenseSubCat };
    },
    [expenseSubCategories, id],
  );
  // **************************************************************************

  const [expenseSubCategory, setExpenseSubCategory] = useState(initialExpenseSubCatState);
  const [formErrors, setFormErrors] = useState({});
  const cancelURL = expenseSubCategory.id ? `/expense_sub_categories/${expenseSubCategory.id}` : '/expense_sub_categories';
  const title = expenseSubCategory.id ? `${expenseSubCategory.description}` : 'New Expense Sub Category';

  // This useEffect is important. DON'T TOUCH IT. Please ignore eslint warning.
  // Need to keep expenseSubs in the dependency array or else it won't work.
  // explain from web site above.
  // **************************************************************************
  useEffect(() => {
    setExpenseSubCategory(initialExpenseSubCatState);
  }, [expenseSubCategories]); // Please ignore eslint warning. Need to keep it that way
  // **************************************************************************

  const updateExpenseSubCategory = (key, value) => {
    setExpenseSubCategory((prevExpenseSubCat) => ({ ...prevExpenseSubCat, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const val = target.value;
    updateExpenseSubCategory(name, val);
    console.log(`InputFieldName: ${name}, val: ${val}`);
  };

  const handleCategoryInputChange = (event) => {
    const { value } = event.target;
    updateExpenseSubCategory('expense_category_id', value);
    const expenseCategory = expenseCategories.find((e) => e.id === Number(value));
    updateExpenseSubCategory('expense_category_name', expenseCategory.name);
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the ExpenseSub from being saved:</h3>
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
    const errors = validateExpenseSubCategory(expenseSubCategory);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(expenseSubCategory);
    }
  };

  return (
    <div className="eventContainer">
      <h2>{title}</h2>
      {renderErrors()}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Grid container spacing={2}>
            {title === 'New Expense Sub Category' && (
              <Grid item xs={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Expense Category *</InputLabel>
                  <Select
                    sx={{
                      width: { sm: 300, md: 400 },
                    }}
                    id="expense_category_id"
                    name="expense_category_id"
                    label="Expense Category"
                    onChange={handleCategoryInputChange}
                    native
                    value={expenseSubCategory.expense_category_id || ''}
                    required
                  >
                    <option value=""> </option>
                    {expenseCategories.map((expenseCategory) => (
                      <option
                        key={expenseCategory.id}
                        value={expenseCategory.id}
                      >
                        {expenseCategory.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {title !== 'New Expense Sub Category' && (
              <Grid item xs={12}>
                <TextField
                  sx={{
                    width: { sm: 300, md: 400 },
                  }}
                  type="text"
                  id="expense_category_name"
                  name="expense_category_name"
                  label="Expense Category"
                  value={expenseSubCategory.expense_category_name || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                sx={{
                  width: { sm: 300, md: 400 },
                }}
                type="text"
                id="expense_code"
                name="expense_code"
                label="Expense Code"
                onChange={handleInputChange}
                value={expenseSubCategory.expense_code || ''}
                size="small"
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  width: { sm: 300, md: 400 },
                }}
                type="text"
                id="name"
                name="name"
                label="Name"
                onChange={handleInputChange}
                value={expenseSubCategory.name || ''}
                size="small"
                fullWidth
                variant="outlined"
                required
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
  );
};

ExpenseSubCatForm.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  expenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  expenseSubCategories: PropTypes.arrayOf(
    PropTypes.shape({
      // expenseSub_category_name: PropTypes.string.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

ExpenseSubCatForm.defaultProps = {
  expenseSubCategories: [],
};

export default ExpenseSubCatForm;
