import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Iconos para actualizar y enviar mensaje
import './actividadComida.css'; // Importa el archivo CSS
import DropAct from './dropAct';

const childrenData = [
    { id: 1, name: 'Juanito' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Pedro' },
    { id: 4, name: 'Lucía' },
];

function ActividadComida() {
    return (
        <div className='contenedortabla'>       
            
            <div className="children-table">
           
            <div>
            <DropAct/> 
            </div>           
                <div className="table-header">
                    <span>Nombre</span>
                    <span>Acciones</span>
                </div>
                {childrenData.map(child => (
                    <div key={child.id} className="table-row">
                        <div className='centrar'>
                        <span className="child-name">{child.name}</span>
                        </div>
                        <div className="icon-actions centrar">
                            <FontAwesomeIcon icon={faEdit} size="1x" className="icon" title="Actualizar estado" />
                            <FontAwesomeIcon icon={faEnvelope} size="1x" className="icon" title="Enviar mensaje" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActividadComida;