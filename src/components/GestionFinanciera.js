import React, { useState } from 'react';
import './GestionFinanciera.css';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

export function RegistrarPago() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/main');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className='register-user-form-container'>
      <div className="gestion-financiera-container">
        <h2>Registro de pago</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdf">Subir factura de pago (Solo PDF):</label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
          <button type="submit" className="submit-button">Enviar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export function ReciboPago() {
  const [user, setUser] = useState('');
  const [reciboData, setReciboData] = useState({
    nombre: '',
    apellido: '',
    monto: '',
    concepto: '',
  });

  const usuarios = {
    user1: { nombre: 'Juan', apellido: 'Pérez', monto: '1000', concepto: 'Pago' },
    user2: { nombre: 'María', apellido: 'López', monto: '1200', concepto: 'Pago' },
    user3: { nombre: 'Pedro', apellido: 'González', monto: '1100', concepto: 'Pago' },
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/main');
  };

  const handleUserChange = (e) => {
    const selectedUser = e.target.value;
    setUser(selectedUser);
    if (usuarios[selectedUser]) {
      setReciboData(usuarios[selectedUser]);
    } else {
      setReciboData({
        nombre: '',
        apellido: '',
        monto: '',
        concepto: '',
      });
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(20, 20, `Recibo de Pago`);
    doc.text(20, 30, `Nombre: ${reciboData.nombre}`);
    doc.text(20, 40, `Apellido: ${reciboData.apellido}`);
    doc.text(20, 50, `Monto: ${reciboData.monto}`);
    doc.text(20, 60, `Concepto: ${reciboData.concepto}`);
    doc.save('recibo_pago.pdf');
  };

  return (
    <div className='register-user-form-container'>
      <div className="recibo-container">
        <h2>Generador de Recibos de Pago</h2>
        <div className="user-select-container">
          <label htmlFor="user-select">Seleccionar Usuario:</label>
          <select id="user-select" value={user} onChange={handleUserChange}>
            <option value="">Selecciona un usuario</option>
            <option value="user1">Usuario 1</option>
            <option value="user2">Usuario 2</option>
            <option value="user3">Usuario 3</option>
            {/* Añade más opciones según sea necesario */}
          </select>
        </div>

        <div className="recibo-info">
          <p><strong>Nombre:</strong> {reciboData.nombre}</p>
          <p><strong>Apellido:</strong> {reciboData.apellido}</p>
          <p><strong>Monto:</strong> {reciboData.monto}</p>
          <p><strong>Concepto:</strong> {reciboData.concepto}</p>
        </div>


        <div className="button-group">
        <button onClick={exportPDF} className="export-button">Exportar como PDF</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      
      </div>
    </div>
  );
}

export function ControlPagos() {
  const [usuarios] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', pagado: true },
    { id: 2, nombre: 'María', apellido: 'López', pagado: false },
    { id: 3, nombre: 'Pedro', apellido: 'González', pagado: true },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', pagado: false },
  ]);

  const usuariosPagados = usuarios.filter(usuario => usuario.pagado);
  const usuariosNoPagados = usuarios.filter(usuario => !usuario.pagado);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/main');
  };
  return (
    <div className='register-user-form-container'>
      <div className="control-pagos-container">
        <h2>Control de Pagos</h2>
        <div className="pagos-section">
          <h3>Usuarios que Han Pagado</h3>
          <ul>
            {usuariosPagados.map(usuario => (
              <li key={usuario.id}>
                {usuario.nombre} {usuario.apellido}
              </li>
            ))}
          </ul>
        </div>

        <div className="pagos-section">
          <h3>Usuarios con Pagos Pendientes</h3>
          <ul>
            {usuariosNoPagados.map(usuario => (
              <li key={usuario.id}>
                {usuario.nombre} {usuario.apellido}
              </li>
            ))}
          </ul>
        </div>
        <div>
        <button type="button" onClick={handleCancel}>Salir</button>

        </div>
      </div>
    </div>
  );
}
