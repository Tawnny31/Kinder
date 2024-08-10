// src/components/RegisterUserForm.js
import React, { useState } from 'react';
import './RegisterUserForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faPhone, faEnvelope, faLock, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    phone: '',
    email: '',
    password: '',
    role: 'padre'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role === 'padre') {
      navigate('/register-children', { state: { parentData: formData } });
    } else {
      // Aquí deberías enviar los datos del usuario a tu backend para registrarlo
      console.log('User Data:', formData);
      navigate('/main'); // o la ruta correspondiente después del registro
    }
  };

  const handleCancel = () => {
    navigate('/main');
  };

  return (
    <div className="register-user-form-container">
      <form onSubmit={handleSubmit} className="register-user-form">
        <h2>Registrar Nuevo Usuario</h2>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nombre Completo"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faIdCard} />
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              placeholder="Cédula"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Teléfono"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Correo Electrónico"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon">
            <FontAwesomeIcon icon={faUserTie} />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="padre">Padre de Familia</option>
              <option value="maestra">Maestra</option>
              <option value="directora">Directora</option>
            </select>
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Registrar Usuario</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;
