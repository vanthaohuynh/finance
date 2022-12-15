import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserList from './UserList';
import User from './User';
import UserForm from './UserForm';
import { info, success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import ErrorBoundary from '../../ErrorBoundary';

const Users = ({ token, handleSelectedIndex, handleLogout }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dataFetchedRef = useRef(false);

  const apiUserEndpoint = '/users';
  // const apiRegistrationEndpoint = '/registrations';
  const apiRoleEndpoint = '/roles';
  const urlValidation = '/validate_token';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchRoleData = async () => {
    try {
      const response = await axios.get(apiRoleEndpoint);
      if (response.status === 200) {
        console.log('Admin: Users: fetcRoleData: response.data: ', response.data);
        const roleList = response.data.sort((a, b) => a.id - b.id);
        setRoles(roleList);
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUserEndpoint);
      if (response.status === 200) {
        console.log('Admin: Users: fetchUserData: response.data: ', response.data);
        setUsers(response.data);
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(urlValidation);
      if (response.status === 200) {
        fetchUserData();
        fetchRoleData();
      }
    } catch (err) {
      handleAjaxError(err);
      handleLogout();
    }
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      validateToken();
      handleSelectedIndex(5);
    }
  }, []); // Need to keep this dependencies array empty

  const reloadUserData = async () => {
    try {
      const response = await axios.get(apiUserEndpoint);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const addUser = async (newUser) => {
    console.log('Admin: Users: addUser: newUser: ', newUser);
    try {
      const response = await axios
        .post(
          apiUserEndpoint,
          {
            user: {
              email: newUser.email,
              password: newUser.password,
              password_confirmation: newUser.password_confirmation,
              role_id: newUser.role_id,
              role_name: newUser.role_name,
            },
          },
          { withCredentials: true },
        );
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const savedUser = response.data;
      console.log('Admin: Users: addUser', savedUser);
      const newUsers = [...users, savedUser];
      setUsers(newUsers);
      reloadUserData();
      success('User Added!');
      navigate(`/users/${savedUser.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const deleteUser = async (userId) => {
    confirm({
      title: 'Confirmation',
      description: `Are you sure you want to delete this user? ${userId} `,
    })
      .then(async () => {
        try {
          const response = await axios.delete(`${apiUserEndpoint}/${userId}`);
          if (response.status !== 204) {
            throw Error(response.statusText);
          }
          const newUsers = users.filter((user) => user.id !== userId);
          setUsers(newUsers);
          success('User Deleted!');
          navigate('/users');
        } catch (err) {
          handleAjaxError(err);
          // To be implemented: Using ErrorBoundary
          // setError(err);
          // setIsError(true);
          // console.error(Error(err.message ? err.message : err));
        }
      })
      .catch(() => {
        info('Delete cancelled');
      });
  };

  const updateUser = async (updatedUser) => {
    console.log('Admin: Users: updateUser', updatedUser);
    try {
      const response = await axios
        .patch(
          `${apiUserEndpoint}/${updatedUser.id}`,
          {
            user: {
              email: updatedUser.email,
              password: updatedUser.password,
              password_confirmation: updatedUser.password_confirmation,
              role_id: updatedUser.role_id,
              role_name: updatedUser.role_name,
            },
          },
          { withCredentials: true },
        );
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      console.log('Admin: Users: updateUser: response: ', response.data);
      const newUsers = users;
      const idx = newUsers.findIndex((user) => user.id === updatedUser.id);
      newUsers[idx] = updatedUser;
      console.log('Admin: Users: updateUser: newUsers: ', newUsers);
      setUsers(newUsers);
      reloadUserData();
      success('User Updated!');
      navigate(`/users/${updatedUser.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  return (
    <div className="grid">
      <ErrorBoundary>
        <UserList users={users} />
      </ErrorBoundary>
      <Routes>
        <Route
          path=":id"
          element={(
            <ErrorBoundary>
              <User
                users={users}
                onDelete={deleteUser}
              />
            </ErrorBoundary>
          )}
        />
        <Route
          path=":id/edit"
          element={(
            <ErrorBoundary>
              <UserForm
                users={users}
                roles={roles}
                onSave={updateUser}
              />
            </ErrorBoundary>
            )}
        />
        <Route
          path="new"
          element={(
            <ErrorBoundary>
              <UserForm
                // For new user, do not pass users
                // in order to setup initial state
                // users={users}
                roles={roles}
                onSave={addUser}
              />
            </ErrorBoundary>
        )}
        />
      </Routes>
    </div>
  );
};

Users.propTypes = {
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Users;
