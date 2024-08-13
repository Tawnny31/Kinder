import React, { useState } from 'react';
import './ChatForm.css';
import { useNavigate } from 'react-router-dom';



const ChatForm = () => {
  const [parents, setParents] = useState([
    { id: 1, name: 'Ana Pérez', email: 'ana.perez@example.com', type: 'Interno' },
    { id: 2, name: 'Carlos Gómez', email: 'carlos.gomez@example.com', type: 'Externo' },
    { id: 3, name: 'Laura Martínez', email: 'laura.martinez@example.com', type: 'Interno' }
  ]);

  const [selectedParents, setSelectedParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filter, setFilter] = useState('Todos');
  const navigate = useNavigate();

  const handleSelectParent = (parent, isChecked) => {
    setSelectedParents(prev =>
      isChecked ? [...prev, parent] : prev.filter(p => p.id !== parent.id)
    );
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectedParents(isChecked ? parents.filter(p => filter === 'Todos' || p.type === filter) : []);
  };

  const handleStartChat = () => {
    if (selectedParents.length === 1) {
      setSelectedParent(selectedParents[0]);
    } else {
      alert('Por favor, selecciona un solo padre para iniciar el chat.');
    }
  };

  const handleSendMessage = () => {
    // Implement message sending logic
    console.log('Message sent:', message, 'to:', selectedParent);
    setMessage('');
    setFile(null);
  };

  const handleCloseChat = () => {
    setSelectedParent(null);
    setSelectedParents([]);
    setMessage('');
    setFile(null);
  };

  const handleCancel = () => {
    navigate('/main');
  };


  const filteredParents = filter === 'Todos' ? parents : parents.filter(p => p.type === filter);

  return (
    <div className="chat-form">
      <h2>Envíos de Correos</h2>
      <div className="chat-form-container">
        <div className="parent-list">
          <h3>Lista de Usuarios</h3>
          <div className="filter-container">
            <label>Filtrar por tipo:</label>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="Todos">Todos</option>
              <option value="Interno">Interno</option>
              <option value="Externo">Externo</option>
            </select>
          </div>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedParents.length === filteredParents.length}
          />
          <label>Seleccionar Todos</label>
          <ul>
            {filteredParents.map(parent => (
              <li key={parent.id}>
                <input
                  type="checkbox"
                  checked={selectedParents.includes(parent)}
                  onChange={(e) => handleSelectParent(parent, e.target.checked)}
                />
                <label>{parent.name}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleStartChat} className="start-chat-button">Iniciar Chat</button>
          <button onClick={handleCancel} className="cancel-chat-button">Cancelar</button>
        </div>

        <div className="chat-area">
          {selectedParent && (
            <>
              <div className="chat-header">
                <h3>Chat con {selectedParent.name}</h3>
                <button onClick={handleCloseChat} className="close-button">
                  X
                </button>
              </div>
              <p><strong>Correo:</strong> {selectedParent.email}</p>
              <div className="message-area">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleSendMessage} className="send-button">Enviar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
