import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Asegúrate de tener un componente Modal
import RegisterChildrenForm from './RegisterChildrenForm'; // Componente para niños
import RegisterUserForm from './RegisterUserForm'; // Componente para usuarios
import './UserMaintenance.css'; // Asegúrate de tener los estilos necesarios

const UserMaintenance = () => {
  const [filters, setFilters] = useState({
    inactivityDate: '',
    name: '',
    idCard: '',
    status: '',
    entryDate: '',
    role: ''
  });
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    // Aquí iría la lógica para filtrar los usuarios según los filtros
    // y actualizar el estado `userList`
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType(user.isChild ? 'child' : 'user');
    setShowModal(true);
  };

  const handleInactivate = (userId) => {
    // Aquí iría la lógica para inactivar al usuario
  };

  const handleDelete = (userId) => {
    // Aquí iría la lógica para eliminar al usuario
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-maintenance-container">
      <div className="filters">
        <input
          type="date"
          name="inactivityDate"
          value={filters.inactivityDate}
          onChange={handleFilterChange}
          placeholder="Fecha de Inactividad"
        />
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="idCard"
          value={filters.idCard}
          onChange={handleFilterChange}
          placeholder="Cédula"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">Estado</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
        <input
          type="date"
          name="entryDate"
          value={filters.entryDate}
          onChange={handleFilterChange}
          placeholder="Fecha de Ingreso"
        />
        <input
          type="text"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          placeholder="Rol"
        />
        <button onClick={handleSearch}>Consultar</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Estado</th>
            <th>Fecha de Ingreso</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.idCard}</td>
              <td>{user.status}</td>
              <td>{user.entryDate}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleInactivate(user.id)}>Inactivar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal isOpen={showModal} onClose={handleModalClose}>
          {modalType === 'child' ? (
            <RegisterChildrenForm user={selectedUser} onClose={handleModalClose} />
          ) : (
            <RegisterUserForm user={selectedUser} onClose={handleModalClose} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserMaintenance;
