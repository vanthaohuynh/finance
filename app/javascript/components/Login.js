import React from 'react';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Login = () => {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const sendAjaxRequest = async (email, password) => {
    try {
      const response = await window.fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            // email: 'jack@example.com',
            // password: 'aaaaaaaa',
            email: email,
            password: password,
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const response2 = await response.json();
      success('Log in successful!', response2);
      console.log('Response2', response2);
      // navigate(`/accounts/${savedAccount.id}`);
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email', email);
    console.log('Password', password);
    sendAjaxRequest(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input id="email" placeholder="email" />
        <input id="password" placeholder="password" />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
