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
            <h2>Gráficas de Calorías por actividad</h2>
            {/* Gráfica de datos del Apple Watch */}
            <div>
                <ActivityChart awData={awData} fitbitData={fitbitData}/>
            </div>
        </div>
    );
};

export default GraphsPage;
