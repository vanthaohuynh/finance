import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const ExpenseCategoryList = ({ expenseCategories }) => {
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
          <Link to={`/expense_categories/${id}`}>{value}</Link>
        );
      },
    },
    // {
    //   field: 'description',
    //   headerName: 'Description',
    //   width: 200,
    //   editable: false,
    // },
  ];

  function customGridToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          variant="text"
          size="small"
          color="primary"
          startIcon={(<AddIcon />)}
        >
          <Link to="/expense_categories/new" style={{ color: '#1876d2' }}>
            Add New
          </Link>
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const renderExpenseCategories = () => {
    const sortedExpenseCategories = [...expenseCategories].sort((a, b) => new
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
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#b7d7f4',
            color: 'black',
            fontVariantCaps: 'all-small-caps',
            fontStyle: 'bold',
            fontSize: 18,
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            '& .MuiDataGrid-row': {
              '&:nth-child(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
              '&:hover': { backgroundColor: '#d1e6f9' },
            },
          },
        }}
      >
        <DataGrid
          rowHeight={35}
          headerHeight={35}
          rows={sortedExpenseCategories}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          components={{ Toolbar: customGridToolbar }}
          // components={{ Toolbar: GridToolbar }}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="pageHeader">
          <Typography variant="h6" component="h6" align="left">
            Expense Categories
          </Typography>
          {/* <Button
            sx={{
              width: 125,
              height: 40,
              backgroundColor: 'white',
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/expense_categories/new"
          >
            Add New
          </Button> */}
        </div>
        <div className="eventList">
          {renderExpenseCategories()}
        </div>
      </Stack>
    </section>
  );
};

ExpenseCategoryList.propTypes = {
  expenseCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default ExpenseCategoryList;
