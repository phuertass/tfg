import React from 'react';

/**
 * Componente para mostrar los datos filtrados en formato de tabla.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Array} props.filteredData - Datos filtrados que se mostrarán en la tabla.
 * @returns {JSX.Element} El componente de la tabla de datos filtrados.
 */
const FilteredDataTable = ({ filteredData }) => {
    return (
        <div className="filtered-data">
            <h2>Datos Filtrados</h2>
            {filteredData.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>Actividad</th>
                        <th>Pasos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((doc, index) => (
                        <tr key={index}>
                            <td>{doc.age}</td>
                            <td>{doc.gender}</td>
                            <td>{doc.height}</td>
                            <td>{doc.weight}</td>
                            <td>{doc.activity_trimmed}</td>
                            <td>{doc.Applewatch ? doc.Applewatch.Steps_LE : doc.Fitbit ? doc.Fitbit.Steps_LE : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles según los filtros seleccionados.</p>
            )}
        </div>
    );
};

export default FilteredDataTable;