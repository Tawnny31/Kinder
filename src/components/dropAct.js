import React, { useState } from 'react';

const DropAct = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Opción seleccionada: ${option}`);
        setIsOpen(false); // Cierra el dropdown después de seleccionar una opción
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', margin:5 }}>
            <button onClick={toggleDropdown} style={{ padding: '10px', cursor: 'pointer' }}>
                Selecciona un tipo de alimentción
            </button>
            {isOpen && (
                <ul style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    listStyleType: 'none',
                    padding: '0',
                    margin: '0',
                    zIndex: 1,
                }}>
                    <li onClick={() => handleOptionClick('Opción 1')} style={{ padding: '10px', cursor: 'pointer' }}>Desayuno</li>
                    <li onClick={() => handleOptionClick('Opción 2')} style={{ padding: '10px', cursor: 'pointer' }}>Merienda</li>
                    <li onClick={() => handleOptionClick('Opción 3')} style={{ padding: '10px', cursor: 'pointer' }}>Almuerzo</li>
                </ul>
            )}
        </div>
    );
};

export default DropAct;