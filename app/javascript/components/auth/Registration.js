import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { handleAjaxError } from '../../helpers/helpers';

const Registration = ({ handleSuccessfulAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // const [registrationErrors, setRegistrationErrors] = useState('');

  const handleSubmit = (e) => {
    axios
      .post(
        'http://localhost:3000/registrations',
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log('registration res', response);
        if (response.data.status === 'created') {
          handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log('registration error', error);
        // setRegistrationErrors(error.response.data.errors);
        handleAjaxError(error);
      });
    e.preventDefault();
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Password confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

Registration.propTypes = {
  handleSuccessfulAuth: PropTypes.func,
};

Registration.defaultProps = {
  handleSuccessfulAuth: () => {},
};

export default Registration;
