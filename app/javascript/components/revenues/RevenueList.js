import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const RevenueList = ({ revenues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);
  const [error, setError] = useState({ message: "I'm an error message" });

  const crash = () => {
    setError(null);
  };

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value?.toString().toLowerCase().indexOf(searchTerm?.toString().toLowerCase()) > -1
    );
  };

  const columns = [
  {
    field: 'revenue_num',
    headerName: 'Revenue Number',
    width: 200,
    editable: false,
    renderCell: params => {
      const { id } = params;
      const { value } = params;
      return (
        <Link to={`/revenues/${params.id}`}>{value}</Link>
      );
    },
  },
  {
    field: 'study_title',
    headerName: 'Study Title',
    width: 150,
    editable: false,
  },
  {
    field: 'study_name',
    headerName: 'Study Name',
    width: 150,
    editable: false,
  },
];

  ///////////////////////////////////////////////////
  // This codes working without the Search (need a curly bracket after =>)
  // const renderRevenues = (revenueArray) => {
    // revenueArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    // return revenueArray.map((revenue) => (
    //   <li key={revenue.id}>
    //     <NavLink to={`/revenues/${revenue.id}`}>
    //       {revenue.revenue_num}
    //     </NavLink>
    //   </li>
    // ));
    // };
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // This codes working with the Search input. No need for curly bracket after =>)
    // const renderRevenues = (revenueArray) =>
    // revenueArray
    //   .filter((el) => matchSearchTerm(el))
    //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    //   .map((revenue) => (
    //     <li key={revenue.id}>
    //       <NavLink to={`/revenues/${revenue.id}`}>
    //           {revenue.revenue_num} - {revenue.study_title}
    //       </NavLink>
    //     </li>
    //   ));
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // Using MUI DaraGrid
    const renderRevenues = (revenues) =>
    {
      const sortedRevenues = [...revenues].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return (
        <>
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
              rows={sortedRevenues}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            >
            </DataGrid>
          </Box>
        </>
      );
    };

  return (
    <section>
      <Stack spacing={2}>
        <div className="button-mui" align="left">
          <Button
            sx={{
              width: 125,
              height: 40,
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link} to="/revenues/new"
          >
            Add New
          </Button>
          {/* <Button onClick={crash}>CRASH TEST</Button>
            <p style={{ color: "red" }}>{error.message}</p> */}

          {/* // This is the Search box maybe needed in the future*/}
          {/* <Grid item xs={6}>
            <TextField
              type="text"
              className="search"
              placeholder="Search"
              inputRef={searchInput}
              onKeyUp={updateSearchTerm}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid> */}
        </div>
        <div className="eventList">
          {renderRevenues(revenues)}
        </div>
      </Stack>
    </section>
  );
};

RevenueList.propTypes = {
  revenues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    revenue_num: PropTypes.string,
    muhc_revenue: PropTypes.string,
    study_title: PropTypes.string,
    study_name: PropTypes.string,
    sponsor_name: PropTypes.string,
    sponsor_contact: PropTypes.string,
    number_of_patients: PropTypes.number,
    cta_date: PropTypes.string,
    phase: PropTypes.string,
    cim_contact: PropTypes.string,
    cro_name: PropTypes.string,
    cro_contact: PropTypes.string,
    budget_version: PropTypes.string,
    budget_currency: PropTypes.string,
    invoicing_terms: PropTypes.string,
    notes: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })).isRequired,
};

export default RevenueList;
