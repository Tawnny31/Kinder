// IconComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faToilet, faBed, faCarrot } from '@fortawesome/free-solid-svg-icons'; // Importa los nuevos iconos
import './actividades.css'; // Importa el archivo CSS


const Actividades = () => {
    return (
        <div className='cuerpo'>            
            <h1 className='titulo'>Actividades </h1>  
            <div className='container marco'>                    
                <div className="icon-grid">

                    <Link to="/act-comida">
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faUtensils} size="3x" />
                            <p>Comida</p>
                        </div>
                    </Link>

                    <Link to="/act-dormir">
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faBed} size="3x" />
                            <p>Dormir</p>
                        </div>
                    </Link>

                    <Link to="/act-baño">
                        <div className="icon-item">
                            <FontAwesomeIcon icon={faToilet} size="3x" />
                            <p>Ir al baño</p>
                        </div>
                    </Link>

                    <div className="icon-item">
                        <FontAwesomeIcon icon={faCarrot} size="3x" />
                        <p>Huerta</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Actividades;