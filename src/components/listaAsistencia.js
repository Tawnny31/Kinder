
import React, { useState } from 'react';
import './listaAsistencia.css'; // Importa el archivo CSS

const ListaAsistencia = () => {
  const [ninos] = useState([
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'María' },
    { id: 3, nombre: 'Pedro' },
    { id: 4, nombre: 'Ana' },
  ]);

  const [asistencia, setAsistencia] = useState({});

  const handleChange = (id, value) => {
    setAsistencia({
      ...asistencia,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registros de asistencia:', asistencia);
    // Aquí puedes agregar la lógica para guardar los registros
    alert('Registros guardados con éxito!');
  };

  return (
    <div className='contenedorPrincipal'>
    
      <h1>Registro de Asistencia</h1>

    <div>
      <form onSubmit={handleSubmit}>

        <div className='conten-table'>
            <table>
          <thead>
            <tr>
              <th>Nombre del Niño</th>
              <th>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {ninos.map((nino) => (
              <tr key={nino.id}>
                <td>{nino.nombre}</td>
                <td>
                  <select onChange={(e) => handleChange(nino.id, e.target.value)} defaultValue="">
                    <option value="" disabled>Seleccionar</option>
                    <option value="presente">Presente</option>
                    <option value="ausente">Ausente</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>        
        <button type="submit">Guardar Registros</button>
      </form>
      </div>
     
    </div>
  );
};

export default ListaAsistencia;