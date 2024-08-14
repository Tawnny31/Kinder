import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Inventario.css';

const InventoryForm = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemStatus, setItemStatus] = useState('Disponible');
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleAddItem = () => {
    const newItem = { name: itemName, quantity: itemQuantity, status: itemStatus };
    setItems([...items, newItem]);
    resetForm();
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemStatus(item.status);
    setEditingIndex(index);
  };

  const handleUpdateItem = () => {
    const updatedItems = [...items];
    updatedItems[editingIndex] = { name: itemName, quantity: itemQuantity, status: itemStatus };
    setItems(updatedItems);
    resetForm();
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setItemName('');
    setItemQuantity('');
    setItemStatus('Disponible');
    setEditingIndex(null);
  };

  const handleCancel = () => {
    navigate('/main'); // Redirige a la página principal
  };

  return (
    <div className="inventory-form-container">
      <h2>Gestión de Inventario</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Nombre del Ítem:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select value={itemStatus} onChange={(e) => setItemStatus(e.target.value)}>
            <option value="Disponible">Disponible</option>
            <option value="En Uso">En Uso</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
        <div className="form-actions">
          {editingIndex === null ? (
            <button type="button" className="add-button" onClick={handleAddItem}>
              Agregar Ítem
            </button>
          ) : (
            <button type="button" className="update-button" onClick={handleUpdateItem}>
              Actualizar Ítem
            </button>
          )}
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>

      <div className="inventory-list">
        <h3>Lista de Ítems</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="inventory-item">
              <span>{item.name} - {item.quantity} unidades - {item.status}</span>
              <button className="edit-button" onClick={() => handleEditItem(index)}>Editar</button>
              <button className="delete-button" onClick={() => handleDeleteItem(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryForm;
