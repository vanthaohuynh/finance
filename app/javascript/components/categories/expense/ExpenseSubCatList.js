import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const ExpenseSubCategoryList = ({ expenseSubCategories }) => {
  const columns = [
    {
      field: 'expense_category_name',
      headerName: 'Expense Category',
      width: 250,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/expense_sub_categories/${id}`}>{value}</Link>
        );
      },
    },
    {
      field: 'expense_code',
      headerName: 'Sub Expense Code',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const { id } = params;
        const { value } = params;
        return (
          <Link to={`/expense_sub_categories/${id}`}>{value}</Link>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Sub Expense Name',
      width: 300,
      editable: false,
    },
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
          <Link to="/expense_sub_categories/new" style={{ color: '#1876d2' }}>
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

  // eslint-disable-next-line
  const renderExpenseSubCategories = () => {
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
          rows={expenseSubCategories}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          components={{ Toolbar: customGridToolbar }}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="pageHeader">
          <Typography variant="h6" component="h6" align="left">
            Expense Sub Categories
          </Typography>
        </div>
        <div className="eventList">
          {renderExpenseSubCategories()}
        </div>
      </Stack>
    </section>
  );
};

ExpenseSubCategoryList.propTypes = {
  // expenseCategories: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  // })).isRequired,
  expenseSubCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    expense_code: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
};

export default ExpenseSubCategoryList;
