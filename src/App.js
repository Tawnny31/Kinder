// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import RegisterUserForm from './components/RegisterUserForm';
import MainLayout from './components/MainLayout'; 
import RegisterChildrenForm from './components/RegisterChildrenForm';
import UserMaintenance from './components/UserMaintenance';
import Reportes from './components/Reportes';
import Expedientes from './components/Expedientes';
import ChatForm from './components/ChatForm';
import './App.css';
import Actividades from './components/actividades';
import ActividadComida from './components/actividadComida';
import ActividadDormir from './components/actividadDormir';
import ActividadBaño from './components/actividadBaño';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/main" element={<MainLayout />} />
        <Route path="/register" element={<RegisterUserForm />} />
        <Route path="/register-children" element={<RegisterChildrenForm />} />
        <Route path="/user-maintenance" element={<UserMaintenance />} /> 
        <Route path="/reportes" element={<Reportes />} /> 
        <Route path="/expedientes" element={<Expedientes />} /> 
        <Route path="/comunicacion" element={<ChatForm />} /> 
        <Route path="/actividades" element={<Actividades />} /> 
        <Route path="/act-comida" element={<ActividadComida />} /> 
        <Route path="/act-dormir" element={<ActividadDormir />} /> 
        <Route path="/act-baño" element={<ActividadBaño />} /> 
      </Routes>
    </Router>
  );
};

export default App;

