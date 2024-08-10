// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import RegisterUserForm from './components/RegisterUserForm';
import MainLayout from './components/MainLayout';
import RegisterChildrenForm from './components/RegisterChildrenForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/main" element={<MainLayout />} />
        <Route path="/register" element={<RegisterUserForm />} />
        <Route path="/register-children" element={<RegisterChildrenForm />} />
      </Routes>
    </Router>
  );
};

export default App;

