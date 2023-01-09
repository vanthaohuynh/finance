import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const UserList = ({ users }) => {
  // console.log('UserList: users: ', users);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Link to={`/users/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'role_id',
      headerName: 'Role ID',
      width: 100,
      editable: false,
    },
    {
      field: 'role_name',
      headerName: 'Role Name',
      width: 150,
      editable: false,
    },
  ];
  const renderUsers = () => {
    const sortedUsers = [...users].sort((a, b) => (a.email > b.email ? 1 : -1));
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
          rows={sortedUsers}
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
        <div className="button-mui">
          <Button
            sx={{
              width: 125,
              height: 40,
              backgroundColor: 'white',
            }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/users/new"
          >
            Add New
          </Button>
        </div>
        <div className="eventList">
          {renderUsers()}
        </div>
      </Stack>
    </section>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    password_digest: PropTypes.string,
    role_id: PropTypes.number,
    role_name: PropTypes.string,
  })).isRequired,
  // roles: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  // })).isRequired,
};

export default UserList;
