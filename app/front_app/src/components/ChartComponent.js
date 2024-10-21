import React from 'react';
import { Chart } from 'react-google-charts';

/**
 * Componente genérico para renderizar una gráfica usando react-google-charts.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.title - El título de la gráfica.
 * @param {Array} props.data - Los datos que se mostrarán en la gráfica.
 * @param {Object} props.options - Las opciones de configuración para la gráfica.
 * @returns {JSX.Element} El componente Chart que renderiza la gráfica.
 */
const ChartComponent = ({ title, data, options }) => {
    return (
        <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={data}
            options={{ ...options, title }}
        />
    );
};

export default ChartComponent;