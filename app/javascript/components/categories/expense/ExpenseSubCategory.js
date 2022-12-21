import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
// import ExpenseSubCatList from './ExpenseSubCatList';

const ExpenseSubCategory = ({ userRoleID, expenseSubCategories, onDelete }) => {
  const { id } = useParams();
  const expenseSubCategory = expenseSubCategories.find((e) => e.id === Number(id));
  // const expenseCategory = expenseCategories
  // .find((e) => e.id === expenseSubCategory.expense_category_id);
  const subDescription = expenseSubCategory.description;
  // const newExpenseSubCategories = expenseSubCategories
  //   .filter((e) => e.expense_category_id === expenseCategory.id);

  return (
    <div className="eventContainer">
      <h2>
        {subDescription}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{
                width: { sm: 300, md: 400 },
              }}
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
          <Grid item xs={12}>
            <TextField
              sx={{
                width: { sm: 300, md: 400 },
              }}
              id="expense_code"
              name="expense_code"
              label="Expense Code"
              value={expenseSubCategory.expense_code || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{
                width: { sm: 300, md: 400 },
              }}
              id="name"
              name="name"
              label="Name"
              value={expenseSubCategory.name || ''}
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
                onClick={() => onDelete(expenseSubCategory.id)}
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
                to={`/expense_sub_categories/${expenseSubCategory.id}/edit`}
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

ExpenseSubCategory.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  // expenseCategories: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //   }),
  // ).isRequired,
  expenseSubCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      expense_code: PropTypes.string,
      description: PropTypes.string,
      expense_category_id: PropTypes.number,
      expene_category_name: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExpenseSubCategory;
