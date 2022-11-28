import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Grid, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const RevenueCategory = ({ revenueCategories, onDelete }) => {
  const { id } = useParams();
  const revenueCategory = revenueCategories.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {revenueCategory.name}
      </h2>
      <FormControl className="eventContainer">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={revenueCategory.name || ''}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
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
                onClick={() => onDelete(revenueCategory.id)}
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
                to={`/revenue_categories/${revenueCategory.id}/edit`}
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

RevenueCategory.propTypes = {
  revenueCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RevenueCategory;
