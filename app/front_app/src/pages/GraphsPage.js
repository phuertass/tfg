import React from 'react';
import ActivityChart from '../components/ActivityChart';
import '../styles/GraphsPage.css';

/**
 * Página para mostrar las gráficas de datos de salud.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Object} props.fitbitData - Datos del Fitbit.
 * @returns {JSX.Element} El componente de la página de gráficas.
 */
const GraphsPage = ({ awData, fitbitData }) => {
    return (
        <div>
            <h2>Gráficas de Datos de Salud</h2>
            {/* Gráfica de datos del Apple Watch */}
            <div>
                <h3>Apple Watch - Pasos por Actividad</h3>
                <ActivityChart awData={awData} fitbitData={fitbitData}/>
            </div>
        </div>
    );
};

export default GraphsPage;
