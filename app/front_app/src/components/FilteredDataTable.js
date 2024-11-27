import React from 'react';
import { CSVLink } from 'react-csv';
import '../styles/FilteredDataTable.css';

/**
 * Componente para mostrar los datos filtrados en formato de tabla.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Array} props.filteredData - Datos filtrados que se mostrarán en la tabla.
 * @returns {JSX.Element} El componente de la tabla de datos filtrados.
 */
const FilteredDataTable = ({ filteredData }) => {
    // Configuración para exportar los datos en CSV
    const headers = [
        { label: 'Edad', key: 'age' },
        { label: 'Género', key: 'gender' },
        { label: 'Altura', key: 'height' },
        { label: 'Peso', key: 'weight' },
        { label: 'Actividad', key: 'activity_trimmed' },
        { label: 'Pasos', key: 'steps' },
        { label: 'Calorías', key: 'calories' },
        { label: 'Ritmo Cardíaco', key: 'heart_rate' },
        { label: 'Distancia', key: 'distance' }
    ];

    const csvData = filteredData.map(doc => ({
        age: doc.age,
        gender: doc.gender,
        height: doc.height,
        weight: doc.weight,
        activity_trimmed: doc.activity_trimmed,
        steps: doc.Applewatch ? doc.Applewatch.Steps_LE : doc.Fitbit ? doc.Fitbit.Steps_LE : 'N/A',
        calories: doc.Applewatch ? doc.Applewatch.Calories_LE : doc.Fitbit ? doc.Fitbit.Calories_LE : 'N/A',
        heart_rate: doc.Applewatch ? doc.Applewatch.Heart_LE : doc.Fitbit ? doc.Fitbit.Heart_LE : 'N/A',
        distance: doc.Applewatch ? doc.Applewatch.Distance_LE : doc.Fitbit ? doc.Fitbit.Distance_LE : 'N/A'
    }));

    return (
        <div className="filtered-data">
            <h2>Datos Filtrados</h2>
            {filteredData.length > 0 ? (
                <>
                    <CSVLink data={csvData} headers={headers} filename="datos_filtrados.csv" className="export-csv-button">
                        Exportar Datos a CSV
                    </CSVLink>
                    <table>
                        <thead>
                        <tr>
                            <th>Edad</th>
                            <th>Género</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>Actividad</th>
                            <th>Pasos</th>
                            <th>Calorías</th>
                            <th>Ritmo Cardíaco</th>
                            <th>Distancia</th>
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
                                <td>{doc.Applewatch ? doc.Applewatch.Calories_LE : doc.Fitbit ? doc.Fitbit.Calories_LE : 'N/A'}</td>
                                <td>{doc.Applewatch ? doc.Applewatch.Heart_LE : doc.Fitbit ? doc.Fitbit.Heart_LE : 'N/A'}</td>
                                <td>{doc.Applewatch ? doc.Applewatch.Distance_LE : doc.Fitbit ? doc.Fitbit.Distance_LE : 'N/A'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No hay datos disponibles según los filtros seleccionados.</p>
            )}
        </div>
    );
};

export default FilteredDataTable;