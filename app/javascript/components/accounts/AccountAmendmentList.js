import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

const AccountAmendmentList = ({ amendmentList }) => {
  // const [isAmendmentEmpty, setIsAmendmentEmpty] = React.useState(false);
  // Not working at the moment. If in use, need to fix the useEffect below
  // useEffect(() => {
  //   if (amendmentList.length === 0) {
  //     setIsAmendmentEmpty(true);
  //   }
  // }, [amendmentList]);

  const columns = [
    {
      field: 'count',
      headerName: 'Amend #',
      width: 70,
      editable: false,
      // renderCell: (params) => {
      //   const { id } = params;
      //   const { value } = params;
      //   return (
      //     <Link to={`/account_amendments/${id}`}>{value}</Link>
      //   );
      // },
    },
    {
      field: 'cta_date',
      headerName: 'CTA Date',
      width: 100,
      editable: false,
    },
    {
      field: 'budget_version',
      headerName: 'Budget Version',
      width: 100,
      editable: false,
    },
    {
      field: 'targeted_enrolling_number',
      headerName: 'Targeted Enrolling #',
      width: 130,
      editable: false,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 150,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Date Added',
      width: 100,
      editable: false,
      valueFormatter: (params) => {
        const { value } = params;
        const date = new Date(value);
        // return date.toLocaleDateString();
        return format(date, 'yyyy-MM-dd');
      },
    },
  ];

  const renderAccountAmendments = () => {
    const sortedAmendments = [...amendmentList]
      .sort((a, b) => a.count - b.count);

    return (
      <Box
        sx={{
          height: 265,
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
          rows={sortedAmendments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    );
  };

  return (
    <section>
      <h2>Amendments</h2>
      <Stack spacing={2}>
        {/* <div className="button-mui" align="left">
          <Button
            sx={{
              width: 125,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/account_amendments/new"
          >
            Add New
          </Button>
        </div> */}
        <div className="eventList">
          {renderAccountAmendments()}
        </div>
      </Stack>
    </section>
  );
};

AccountAmendmentList.propTypes = {
  amendmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    account_id: PropTypes.number,
    account_num: PropTypes.string,
    budget_version: PropTypes.string,
    targeted_enrolling_number: PropTypes.number,
    cta_date: PropTypes.string,
    notes: PropTypes.string,
  })).isRequired,
};

export default AccountAmendmentList;
