import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
// import ExpenseSubCatList from './ExpenseSubCatList';

const ExpenseCategory = ({ expenseCategories, expenseSubCategories, onDelete }) => {
  const { id } = useParams();
  const expenseCategory = expenseCategories.find((e) => e.id === Number(id));
  const categoryName = expenseCategory.name;
  // const newExpenseSubCategories = expenseSubCategories
  //   .filter((e) => e.expense_category_id === Number(id));

  return (
    <div className="eventContainerForExpenseCategory">
      <h2>
        {categoryName}
      </h2>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{
                width: { sm: 300, md: 400 },
              }}
              id="name"
              name="name"
              label="Name"
              value={expenseCategory.name || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={expenseCategory.description || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid> */}
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
                onClick={() => onDelete(expenseCategory.id)}
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
                to={`/expense_categories/${expenseCategory.id}/edit`}
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

ExpenseCategory.propTypes = {
  expenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  expenseSubCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      expense_code: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExpenseCategory;
