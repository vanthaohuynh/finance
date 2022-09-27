import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import MainAppBar from './MainAppBar';
import Expenses from './expenses/Expenses';
import Revenues from './revenues/Revenues';
import Accounts from './accounts/Accounts';
import './App.css';

const App = () => (
  <ConfirmProvider>
    <MainAppBar />
    <Container maxWidth="xl">
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/expenses/*" element={<Expenses />} /> */}
        {/* <Route path="/revenues/*" element={<Revenues />} /> */}
        <Route path="/accounts/*" element={<Accounts />} />
      </Routes>
      <ToastContainer />
    </Container>
  </ConfirmProvider>
);

export default App;
