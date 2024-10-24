import React from 'react';
import ActivityChart from '../components/ActivityChart';
import '../styles/GraphsPage.css';

/**
 * Página para mostrar las gráficas de datos de salud.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @returns {JSX.Element} El componente de la página de gráficas.
 */
const GraphsPage = ({ awData }) => {
    return (
        <div>
            <h2>Gráficas de Datos de Salud</h2>
            <ActivityChart awData={awData} />
        </div>
    );
};

export default GraphsPage;
