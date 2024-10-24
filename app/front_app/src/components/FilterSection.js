import React from 'react';
import Select from 'react-select';

/**
 * Componente para la sección de filtros de los datos de salud.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Function} props.setSelectedDevice - Función para actualizar el dispositivo seleccionado.
 * @param {Function} props.setSelectedAge - Función para actualizar el rango de edad seleccionado.
 * @param {Function} props.setSelectedActivity - Función para actualizar la actividad seleccionada.
 * @returns {JSX.Element} El componente de la sección de filtros.
 */
const FilterSection = ({ awData, setSelectedDevice, setSelectedAge, setSelectedActivity }) => {
    // Opciones para el selector de dispositivo
    const deviceOptions = [
        { value: 'applewatch', label: 'Apple Watch' },
        { value: 'fitbit', label: 'Fitbit' }
    ];

    // Opciones para el selector de edad (ejemplo de edades categorizadas)
    const ageOptions = [
        { value: '18-25', label: '18-25' },
        { value: '26-35', label: '26-35' },
        { value: '36-45', label: '36-45' },
        { value: '46+', label: '46+' }
    ];

    // Opciones para el selector de actividad
    const activityOptions = awData.documents
        ? [...new Set(awData.documents.map(doc => doc.activity_trimmed))].map(activity => ({
            value: activity,
            label: activity,
        }))
        : [];

    return (
        <div className="filters">
            <Select
                options={deviceOptions}
                onChange={setSelectedDevice}
                placeholder="Selecciona un dispositivo"
            />
            <Select
                options={ageOptions}
                onChange={setSelectedAge}
                placeholder="Selecciona un rango de edad"
            />
            <Select
                options={activityOptions}
                onChange={setSelectedActivity}
                placeholder="Selecciona una actividad"
            />
        </div>
    );
};

export default FilterSection;
