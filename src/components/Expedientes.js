// src/components/Expedientes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Expedientes.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Para exportar tablas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Expedientes = () => {
  const [children, setChildren] = useState([
    // Datos de ejemplo. Reemplaza con datos reales
    {
      name: 'Juan Pérez',
      birthDate: '2017-05-01',
      idCard: '12345678',
      gender: 'Masculino',
      address: 'Calle Falsa 123',
      specialNeeds: 'Ninguna',
      authorizedPersons: [{ name: 'Ana Pérez', phone: '555-1234' }],
      emergencyContacts: [{ name: 'Carlos Pérez', phone: '555-5678' }],
      photoPreview: 'https://via.placeholder.com/50'
    }
  ]);
  const [filteredChildren, setFilteredChildren] = useState(children);
  const [searchName, setSearchName] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = children.filter(child =>
      (searchName === '' || child.name.includes(searchName)) &&
      (searchCedula === '' || child.idCard.includes(searchCedula))
    );
    setFilteredChildren(filtered);
  };

  const handleDownloadPDF = (childList = filteredChildren) => {
    const doc = new jsPDF();
    if (childList.length === 1) {
      // Exportar expediente individual
      const child = childList[0];
      doc.text(`Expediente de ${child.name}`, 14, 16);
      doc.autoTable({
        startY: 22,
        head: [['Nombre', 'Edad', 'Cédula', 'Género', 'Dirección', 'Necesidades Especiales']],
        body: [[
          child.name,
          calculateAge(child.birthDate),
          child.idCard,
          child.gender,
          child.address,
          child.specialNeeds
        ]],
      });
    } else {
      // Exportar todos los expedientes
      doc.text("Expedientes de Niños", 14, 16);
      doc.autoTable({
        startY: 22,
        head: [['Nombre', 'Edad', 'Cédula', 'Género', 'Dirección', 'Necesidades Especiales']],
        body: childList.map(child => [
          child.name,
          calculateAge(child.birthDate),
          child.idCard,
          child.gender,
          child.address,
          child.specialNeeds
        ]),
      });
    }
    doc.save('expedientes.pdf');
  };

  const handleCancel = () => {
    navigate('/main');
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewDetails = (child) => {
    setSelectedChild(child);
    setShowDetails(true);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedChildren(filteredChildren);
    } else {
      setSelectedChildren([]);
    }
  };

  const handleSelectChild = (child, event) => {
    if (event.target.checked) {
      setSelectedChildren([...selectedChildren, child]);
    } else {
      setSelectedChildren(selectedChildren.filter(c => c !== child));
    }
  };

  return (
    <div className="expedientes-container">
      <h2>Expedientes de Niños</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar por Nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por Cédula"
          value={searchCedula}
          onChange={(e) => setSearchCedula(e.target.value)}
        />
        <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Consultar</button>
        <button onClick={() => handleDownloadPDF()} className="export-button"><FontAwesomeIcon icon={faFilePdf} /> Exportar Todos a PDF</button>
        <button onClick={handleCancel} className="cancel-button"><FontAwesomeIcon icon={faTimes} /> Cancelar</button>
      </div>
      <table className="children-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={filteredChildren.length > 0 && selectedChildren.length === filteredChildren.length}
              />
            </th>
            <th>Fotografía</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Cédula</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Necesidades Especiales</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredChildren.map((child, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedChildren.includes(child)}
                  onChange={(e) => handleSelectChild(child, e)}
                />
              </td>
              <td>{child.photoPreview && <img src={child.photoPreview} alt={`Foto del Niño ${index + 1}`} className="photo-thumbnail" />}</td>
              <td>{child.name}</td>
              <td>{calculateAge(child.birthDate)}</td>
              <td>{child.idCard}</td>
              <td>{child.gender}</td>
              <td>{child.address}</td>
              <td>{child.specialNeeds}</td>
              <td>
                <button className="view-button" onClick={() => handleViewDetails(child)}>Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetails && selectedChild && (
  <div className="details-modal">
    <div className="details-content">
      <h3>Detalles del Niño</h3>
      {selectedChild.photoPreview && (
        <div className="photo-container">
          <img src={selectedChild.photoPreview} alt={`Foto del Niño ${selectedChild.name}`} className="photo-preview" />
        </div>
      )}
      <p><strong>Nombre:</strong> {selectedChild.name}</p>
      <p><strong>Edad:</strong> {calculateAge(selectedChild.birthDate)} años</p>
      <p><strong>Cédula:</strong> {selectedChild.idCard}</p>
      <p><strong>Género:</strong> {selectedChild.gender}</p>
      <p><strong>Dirección:</strong> {selectedChild.address}</p>
      <p><strong>Necesidades Especiales:</strong> {selectedChild.specialNeeds}</p>
      <h4>Personas Autorizadas:</h4>
      {selectedChild.authorizedPersons.map((person, index) => (
        <p key={index}>{person.name} - {person.phone}</p>
      ))}
      <h4>Contactos de Emergencia:</h4>
      {selectedChild.emergencyContacts.map((contact, index) => (
        <p key={index}>{contact.name} - {contact.phone}</p>
      ))}
      <div className="button-container">
        <button onClick={() => handleDownloadPDF([selectedChild])} className="export-individual-button">
          <FontAwesomeIcon icon={faFilePdf} /> Exportar a PDF
        </button>
        <button className="close-ex-button" onClick={() => setShowDetails(false)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Expedientes;
