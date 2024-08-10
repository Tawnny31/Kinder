import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterChildrenForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarDay, faIdCard, faMapMarkerAlt, faGenderless, faNotesMedical, faUserShield, faPhone } from '@fortawesome/free-solid-svg-icons';

const RegisterChildrenForm = () => {
  const [children, setChildren] = useState([{
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
  const location = useLocation();
  const navigate = useNavigate();
  const { parentData } = location.state;

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

  const handleChange = (index, e) => {
    const newChildren = [...children];
    if (e.target.name === 'photo') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        newChildren[index].photo = file;
        newChildren[index].photoPreview = reader.result;
        setChildren(newChildren);
      };
      reader.readAsDataURL(file);
    } else {
      newChildren[index][e.target.name] = e.target.value;
      setChildren(newChildren);
    }
  };

  const handleAddPerson = (index, type) => {
    const newChildren = [...children];
    if (type === 'authorizedPersons') {
      newChildren[index].authorizedPersons.push({
        name: '',
        idCard: '',
        phone: '',
        relation: ''
      });
    } else if (type === 'emergencyContacts') {
      newChildren[index].emergencyContacts.push({
        name: '',
        idCard: '',
        phone: '',
        relation: ''
      });
    }
    setChildren(newChildren);
  };

  const handleRemovePerson = (index, type, personIndex) => {
    const newChildren = [...children];
    newChildren[index][type].splice(personIndex, 1);
    setChildren(newChildren);
  };

  const handlePersonChange = (index, type, personIndex, e) => {
    const newChildren = [...children];
    newChildren[index][type][personIndex][e.target.name] = e.target.value;
    setChildren(newChildren);
  };

  const handleAddChild = () => {
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
  };

  const handleRemoveChild = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    setChildren(newChildren);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = { ...parentData, children };
    console.log('Full Data:', fullData);
    // Aquí deberías enviar los datos al backend para registrarlos
    navigate('/main'); // o la ruta correspondiente después del registro
  };

  const handleCancel = () => {
    navigate('/register');
  };

  return (
    <div className="register-children-form-container">
      <form onSubmit={handleSubmit} className="register-children-form">
        <h2>Registrar Niños</h2>
        {children.map((child, index) => (
          <div key={index} className="form-group">
            <div className="input-icon">
              <label>Fotografía Reciente</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => handleChange(index, e)}
              />
              {child.photoPreview && (
                <img
                  src={child.photoPreview}
                  alt={`Foto del Niño ${index + 1}`}
                  className="photo-preview"
                />
              )}
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="name"
                value={child.name}
                onChange={(e) => handleChange(index, e)}
                required
                placeholder={`Nombre Completo del Niño ${index + 1}`}
              />
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faCalendarDay} />
              <input
                type="date"
                name="birthDate"
                value={child.birthDate}
                onChange={(e) => handleChange(index, e)}
                required
              />
              {child.birthDate && (
                <p className="age-text">Edad: {calculateAge(child.birthDate)} años</p>
              )}
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faIdCard} />
              <input
                type="text"
                name="idCard"
                value={child.idCard}
                onChange={(e) => handleChange(index, e)}
                required
                placeholder={`Cédula del Niño ${index + 1}`}
              />
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faGenderless} />
              <select
                name="gender"
                value={child.gender}
                onChange={(e) => handleChange(index, e)}
                required
              >
                <option value="">Selecciona Género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <input
                type="text"
                name="address"
                value={child.address}
                onChange={(e) => handleChange(index, e)}
                required
                placeholder={`Dirección de Residencia del Niño ${index + 1}`}
              />
            </div>
            <div className="input-icon">
              <FontAwesomeIcon icon={faNotesMedical} />
              <textarea
                name="specialNeeds"
                value={child.specialNeeds}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Información sobre Necesidades Especiales o Discapacidades del Niño ${index + 1}`}
              />
            </div>
            <div className="input-icon">
              <label>Personas Autorizadas para Recoger al Niño</label>
              {child.authorizedPersons.map((person, personIndex) => (
                <div key={personIndex} className="person-group">
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUserShield} />
                    <input
                      type="text"
                      name="name"
                      value={person.name}
                      onChange={(e) => handlePersonChange(index, 'authorizedPersons', personIndex, e)}
                      placeholder="Nombre Completo"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faIdCard} />
                    <input
                      type="text"
                      name="idCard"
                      value={person.idCard}
                      onChange={(e) => handlePersonChange(index, 'authorizedPersons', personIndex, e)}
                      placeholder="Cédula"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faPhone} />
                    <input
                      type="tel"
                      name="phone"
                      value={person.phone}
                      onChange={(e) => handlePersonChange(index, 'authorizedPersons', personIndex, e)}
                      placeholder="Teléfono"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUserShield} />
                    <input
                      type="text"
                      name="relation"
                      value={person.relation}
                      onChange={(e) => handlePersonChange(index, 'authorizedPersons', personIndex, e)}
                      placeholder="Relación con el Niño"
                    />
                  </div>
                  <button type="button" onClick={() => handleRemovePerson(index, 'authorizedPersons', personIndex)} className="remove-person-button">
                    Eliminar Persona Autorizada
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddPerson(index, 'authorizedPersons')} className="add-person-button">
                Agregar
              </button>
            </div>
            <div className="input-icon">
              <label>Información de Contacto de Emergencia</label>
              {child.emergencyContacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="contact-group">
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={(e) => handlePersonChange(index, 'emergencyContacts', contactIndex, e)}
                      placeholder="Nombre Completo"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faIdCard} />
                    <input
                      type="text"
                      name="idCard"
                      value={contact.idCard}
                      onChange={(e) => handlePersonChange(index, 'emergencyContacts', contactIndex, e)}
                      placeholder="Cédula"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faPhone} />
                    <input
                      type="tel"
                      name="phone"
                      value={contact.phone}
                      onChange={(e) => handlePersonChange(index, 'emergencyContacts', contactIndex, e)}
                      placeholder="Teléfono"
                    />
                  </div>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUserShield} />
                    <input
                      type="text"
                      name="relation"
                      value={contact.relation}
                      onChange={(e) => handlePersonChange(index, 'emergencyContacts', contactIndex, e)}
                      placeholder="Relación con el Niño"
                    />
                  </div>
                  <button type="button" onClick={() => handleRemovePerson(index, 'emergencyContacts', contactIndex)} className="remove-person-button">
                    Eliminar Contacto de Emergencia
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddPerson(index, 'emergencyContacts')} className="add-person-button">
                Agregar
              </button>
            </div>
            <div className="button-container">
              <button type="button" onClick={() => handleRemoveChild(index)} className="remove-child-button">
                Eliminar Niño
              </button>
            </div>
          </div>
        ))}
        <div className="button-container">
          <button type="button" onClick={handleAddChild} className="add-child-button">
            Agregar Niño
          </button>
        </div>
        <div className="button-group">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterChildrenForm;
