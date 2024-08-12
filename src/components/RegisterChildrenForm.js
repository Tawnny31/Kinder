import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterChildrenForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarDay, faIdCard, faMapMarkerAlt, faGenderless, faNotesMedical, faUserShield, faPhone } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';


const RegisterChildrenForm = () => {
  const [children, setChildren] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const location = useLocation();
  const { parentData } = location.state;
  const navigate = useNavigate();


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

  const handleChange = (e) => {
    const newChildren = [...children];
    if (e.target.name === 'photo') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        newChildren[editingIndex].photo = file;
        newChildren[editingIndex].photoPreview = reader.result;
        setChildren(newChildren);
      };
      reader.readAsDataURL(file);
    } else {
      newChildren[editingIndex][e.target.name] = e.target.value;
      setChildren(newChildren);
    }
  };

  const handleAddPerson = (type) => {
    const newChildren = [...children];
    if (type === 'authorizedPersons') {
      newChildren[editingIndex].authorizedPersons.push({
        name: '',
        idCard: '',
        phone: '',
        relation: ''
      });
    } else if (type === 'emergencyContacts') {
      newChildren[editingIndex].emergencyContacts.push({
        name: '',
        idCard: '',
        phone: '',
        relation: ''
      });
    }
    setChildren(newChildren);
  };

  const handleRemovePerson = (type, personIndex) => {
    const newChildren = [...children];
    newChildren[editingIndex][type].splice(personIndex, 1);
    setChildren(newChildren);
  };

  const handlePersonChange = (type, personIndex, e) => {
    const newChildren = [...children];
    newChildren[editingIndex][type][personIndex][e.target.name] = e.target.value;
    setChildren(newChildren);
  };

  const handleAddChild = () => {
    setEditingIndex(children.length); // Configura el índice para el nuevo niño
    setChildren([...children, {
      photo: '',
      photoPreview: '',
      name: '',
      birthDate: '',
      idCard: '',
      gender: '',
      address: '',
      specialNeeds: '',
      authorizedPersons: [],
      emergencyContacts: []
    }]);
    setShowForm(true);
  };


  const handleEditChild = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleRemoveChild = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    setChildren(newChildren);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleRedirectToRegister = () => {
    navigate('/register'); // Redirige al formulario de registro
  };



  const renderContacts = (contacts) => (
    contacts.map((contact, index) => (
      <div key={index}>
        {contact.name} ({contact.phone})
      </div>
    ))
  );

  return (
    <div className="register-children-form-container">
      <h2>Registro de Niños</h2>
      <div className="button-container">
        <button type="submit" onClick={handleAddChild}>Agregar Niño</button>
        <button type="button" onClick={handleRedirectToRegister}>Cancelar</button>
      </div>

      <Modal isOpen={showForm} onClose={handleCancel}>
        <form onSubmit={handleSubmit} className="register-children-form">
          {editingIndex !== null ? (
            <div className="form-group">
              <div className="input-icon">
                <label>Fotografía Reciente</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                />
                {children[editingIndex].photoPreview && (
                  <img
                    src={children[editingIndex].photoPreview}
                    alt={`Foto del Niño ${editingIndex + 1}`}
                    className="photo-preview"
                  />
                )}
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="name"
                  value={children[editingIndex].name}
                  onChange={handleChange}
                  required
                  placeholder={`Nombre Completo del Niño ${editingIndex + 1}`}
                />
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faCalendarDay} />
                <input
                  type="date"
                  name="birthDate"
                  value={children[editingIndex].birthDate}
                  onChange={handleChange}
                  required
                />
                {children[editingIndex].birthDate && (
                  <p className="age-text">Edad: {calculateAge(children[editingIndex].birthDate)} años</p>
                )}
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faIdCard} />
                <input
                  type="text"
                  name="idCard"
                  value={children[editingIndex].idCard}
                  onChange={handleChange}
                  required
                  placeholder={`Cédula del Niño ${editingIndex + 1}`}
                />
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faGenderless} />
                <select
                  name="gender"
                  value={children[editingIndex].gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona Género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <input
                  type="text"
                  name="address"
                  value={children[editingIndex].address}
                  onChange={handleChange}
                  required
                  placeholder={`Dirección de Residencia del Niño ${editingIndex + 1}`}
                />
              </div>
              <div className="input-icon">
                <FontAwesomeIcon icon={faNotesMedical} />
                <textarea
                  name="specialNeeds"
                  value={children[editingIndex].specialNeeds}
                  onChange={handleChange}
                  placeholder={`Información sobre necesidades o discapacidades del niño ${editingIndex + 1}`}
                />
              </div>
              <div className="form-group">
                <div>
                  <label>Autorizado para recoger al niño</label>
                  <button className="add-person-button" type="button" onClick={() => handleAddPerson('authorizedPersons')}>
                    Agregar
                  </button>
                </div>
                <div>
                  {children[editingIndex].authorizedPersons.map((person, personIndex) => (
                    <div key={personIndex} className="person-group">
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faUserShield} />
                        <input
                          type="text"
                          name="name"
                          value={person.name}
                          onChange={(e) => handlePersonChange('authorizedPersons', personIndex, e)}
                          placeholder="Nombre Completo"
                        />
                      </div>
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faIdCard} />
                        <input
                          type="text"
                          name="idCard"
                          value={person.idCard}
                          onChange={(e) => handlePersonChange('authorizedPersons', personIndex, e)}
                          placeholder="Cédula"
                        />
                      </div>
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faPhone} />
                        <input
                          type="tel"
                          name="phone"
                          value={person.phone}
                          onChange={(e) => handlePersonChange('authorizedPersons', personIndex, e)}
                          placeholder="Teléfono"
                        />
                      </div>
                      <div className="input-icon">
                        <input
                          type="text"
                          name="relation"
                          value={person.relation}
                          onChange={(e) => handlePersonChange('authorizedPersons', personIndex, e)}
                          placeholder="Relación"
                        />
                      </div>
                      <button className="delete-button" type="button" onClick={() => handleRemovePerson('authorizedPersons', personIndex)}>
                        Eliminar
                      </button>
                    </div>
                  ))}

                </div>
                <div>
                  <label>Contacto de emergencia</label>
                  <button className="add-person-button" type="button" onClick={() => handleAddPerson('emergencyContacts')}>
                    Agregar
                  </button>
                </div>
                <div>
                  {children[editingIndex].emergencyContacts.map((contact, contactIndex) => (
                    <div key={contactIndex} className="contact-group">
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faUser} />
                        <input
                          type="text"
                          name="name"
                          value={contact.name}
                          onChange={(e) => handlePersonChange('emergencyContacts', contactIndex, e)}
                          placeholder="Nombre Completo"
                        />
                      </div>
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faIdCard} />
                        <input
                          type="text"
                          name="idCard"
                          value={contact.idCard}
                          onChange={(e) => handlePersonChange('emergencyContacts', contactIndex, e)}
                          placeholder="Cédula"
                        />
                      </div>
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faPhone} />
                        <input
                          type="tel"
                          name="phone"
                          value={contact.phone}
                          onChange={(e) => handlePersonChange('emergencyContacts', contactIndex, e)}
                          placeholder="Teléfono"
                        />
                      </div>
                      <div className="input-icon">
                        <input
                          type="text"
                          name="relation"
                          value={contact.relation}
                          onChange={(e) => handlePersonChange('emergencyContacts', contactIndex, e)}
                          placeholder="Relación"
                        />
                      </div>
                      <button className="delete-button" type="button" onClick={() => handleRemovePerson('emergencyContacts', contactIndex)}>
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="button-container">
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div>
              {children.map((child, index) => (
                <div key={index} className="child-card">
                  {child.photoPreview && (
                    <img
                      src={child.photoPreview}
                      alt={`Foto del Niño ${index + 1}`}
                      className="photo-preview"
                    />
                  )}
                  <h3>{child.name}</h3>
                  <p>Edad: {calculateAge(child.birthDate)} años</p>
                  <p>Cédula: {child.idCard}</p>
                  <p>Género: {child.gender}</p>
                  <p>Dirección: {child.address}</p>
                  <p>Necesidades Especiales: {child.specialNeeds}</p>
                  <div>
                    <h4>Personas Autorizadas:</h4>
                    {renderContacts(child.authorizedPersons)}
                  </div>
                  <div>
                    <h4>Contactos de Emergencia:</h4>
                    {renderContacts(child.emergencyContacts)}
                  </div>
                  <button className="edit-button" onClick={() => handleEditChild(index)}>Editar</button>
                  <br></br>
                  <button className="delete-button" onClick={() => handleRemoveChild(index)}>Eliminar</button>
                </div>
              ))}
            </div>
          )}
        </form>
      </Modal>

      <table className="children-table">
        <thead>
          <tr>
            <th>Fotografía</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Cédula</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Necesidades Especiales</th>
            <th>Personas Autorizadas</th>
            <th>Contactos de Emergencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={index}>
              <td>{child.photoPreview && <img src={child.photoPreview} alt={`Foto del Niño ${index + 1}`} className="photo-thumbnail" />}</td>
              <td>{child.name}</td>
              <td>{calculateAge(child.birthDate)}</td>
              <td>{child.idCard}</td>
              <td>{child.gender}</td>
              <td>{child.address}</td>
              <td>{child.specialNeeds}</td>
              <td>{renderContacts(child.authorizedPersons)}</td>
              <td>{renderContacts(child.emergencyContacts)}</td>
              <td><div className="button-container">
                <button className="edit-button" onClick={() => handleEditChild(index)}>Editar</button>
                <button className="delete-button" onClick={() => handleRemoveChild(index)}>Eliminar</button>
              </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterChildrenForm;
