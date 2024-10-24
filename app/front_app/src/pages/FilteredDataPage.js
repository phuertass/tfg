import React from 'react';
import FilterSection from '../components/FilterSection';
import FilteredDataTable from '../components/FilteredDataTable';
import '../styles/FilterDataPage.css';

/**
 * Página para mostrar los datos filtrados.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Object} props.fitbitData - Datos del Fitbit.
 * @param {Function} props.setSelectedDevice - Función para actualizar el dispositivo seleccionado.
 * @param {Function} props.setSelectedAge - Función para actualizar el rango de edad seleccionado.
 * @param {Function} props.setSelectedActivity - Función para actualizar la actividad seleccionada.
 * @param {Array} props.filteredData - Datos filtrados que se mostrarán en la tabla.
 * @returns {JSX.Element} El componente de la página de datos filtrados.
 */
const FilteredDataPage = ({ awData, fitbitData, setSelectedDevice, setSelectedAge, setSelectedActivity, filteredData }) => {
    return (
        <div className="filtered-data-page">
            <div className="filter-section-container">
                <h2>Filtrar Datos</h2>
                <FilterSection
                    awData={awData}
                    setSelectedDevice={setSelectedDevice}
                    setSelectedAge={setSelectedAge}
                    setSelectedActivity={setSelectedActivity}
                />
            </div>
            <div className="filtered-data-table-container">
                <h2>Datos Filtrados</h2>
                <FilteredDataTable filteredData={filteredData} />
            </div>
        </div>
    );
};

export default FilteredDataPage;
