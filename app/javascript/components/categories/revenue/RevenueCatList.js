import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const RevenueCategoryList = ({ revenueCategories }) => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 225,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/revenue_categories/${id}`}>{value}</Link>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      editable: false,
    },
  ];

  const renderRevenueCategories = () => {
    const sortedRevenueCategories = [...revenueCategories].sort((a, b) => new
    Date(b.created_at) - new Date(a.created_at));

    return (
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={sortedRevenueCategories}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="button-mui">
          <Button
            sx={{
              width: 125,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/revenue_categories/new"
          >
            Add New
          </Button>
        </div>
        <div className="eventList">
          {renderRevenueCategories()}
        </div>
      </Stack>
    </section>
  );
};

RevenueCategoryList.propTypes = {
  revenueCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default RevenueCategoryList;
