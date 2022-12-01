import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

const RevenueCurrentRiYear = ({ revenueCurrentRiYear }) => {
  console.log('RevenueCurrentRiYear: ', revenueCurrentRiYear);
  const total = revenueCurrentRiYear.reduce((acc, cur) => acc + cur.revenue_total, 0);
  const formattedTotal = Number(total).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const columns = [
    {
      field: 'study_name',
      headerName: 'Study Name',
      width: 200,
      editable: false,
      renderCell: (params) => (
        <Link to={`/accounts/${params.row.id}/transactions`}>{params.value}</Link>
      ),
    },
    {
      field: 'revenue_total',
      headerName: 'Amount',
      width: 175,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return `${valueFormatted}`;
      },
    },
  ];

  const renderTransactions = () => {
    const sortedAccounts = [...revenueCurrentRiYear].sort((a, b) => (a.account_num > b.account_num ? 1 : -1));
    return (
      <Box
        sx={{
          height: 350,
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
          rows={sortedAccounts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="eventList">
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: 20,
              fontWeight: 'bold',
              fontVariantCaps: 'all-small-caps',
              backgroundColor: '#f7afb7',
            }}
            variant="button"
            display="block"
            align="center"
          >
            Revenue Current RI Year
          </Typography>
          {renderTransactions()}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontVariantCaps: 'all-small-caps',
                }}
                variant="button"
                display="block"
              >
                Total:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontVariantCaps: 'all-small-caps',
                }}
                variant="button"
                display="block"
              >
                {formattedTotal}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </section>
  );
};

RevenueCurrentRiYear.propTypes = {
  revenueCurrentRiYear: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    revenue_total: PropTypes.number,
  })).isRequired,
};

export default RevenueCurrentRiYear;
