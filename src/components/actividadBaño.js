import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'; // Iconos para actualizar y enviar mensaje
import './actividadBaño.css'; // Importa el archivo CSS



const childrenData = [
    { id: 1, name: 'Juanito' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Pedro' },
    { id: 4, name: 'Lucía' },
];

function ActividadBaño() {
    return (
        <div className='contenedortabla'>       
            
            <div className="children-table">
           
            <div className='row' style={{textAlign:'center', color: '#A569BD'}}>
              <h3>Cantidad de veces que va al baño</h3>                     
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
                            <input type='text' placeholder="Idas al baño"/>
                            <FontAwesomeIcon icon={faEnvelope} size="1x" className="icon" title="Enviar mensaje" />
                        </div>
                    </div>
                ))}
                <div>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default ActividadBaño;