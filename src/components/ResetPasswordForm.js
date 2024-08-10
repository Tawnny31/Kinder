import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importar Link
import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email for reset:', email);
    // Aquí puedes agregar la lógica para enviar el correo de restablecimiento de contraseña
  };

  return (
    <div className="reset-password-form-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Restablecer Contraseña</h2>
        <div className="form-group">
        <div className="input-icon">
        <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo"
          />
        </div>
        </div>
        <div className="form-buttons">
          <button type="submit">Enviar</button>
          <button type="button" onClick={() => window.history.back()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
