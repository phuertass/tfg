import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ChartComponent from './ChartComponent';

/**
 * Componente para renderizar una gráfica de pasos del Apple Watch según la actividad seleccionada.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Array} props.awData.documents - Array de documentos con actividades y datos del Apple Watch.
 * @returns {JSX.Element} El componente ActivityChart que renderiza la gráfica y un selector de actividad.
 */
const ActivityChart = ({ awData }) => {
    const [chartData, setChartData] = useState([['Activity', 'Apple Watch Steps']]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Actualiza los datos de la gráfica según la actividad seleccionada
    useEffect(() => {
        if (awData.documents.length > 0 && selectedActivity) {
            const filteredData = awData.documents.filter(doc => doc.activity_trimmed === selectedActivity.value);
            const formattedData = filteredData.map(doc => [doc.activity_trimmed, doc.Applewatch.Steps_LE]);

            setChartData([['Activity', 'Apple Watch Steps'], ...formattedData]);
        }
    }, [awData, selectedActivity]);

    // Opciones de actividades para el selector
    const activityOptions = awData.documents
        ? [...new Set(awData.documents.map(doc => doc.activity_trimmed))].map(activity => ({
            value: activity,
            label: activity,
        }))
        : [];

    // Opciones de configuración para la gráfica
    const options = {
        hAxis: { title: '' },
        vAxis: { title: 'Steps' },
        seriesType: 'bars',
        legend: { position: 'bottom' },
    };

    return (
        <div>
            <h2>Selecciona la actividad:</h2>
            <Select
                options={activityOptions}
                onChange={setSelectedActivity}
                placeholder="Selecciona una actividad"
            />
            {awData.documents.length > 0 && selectedActivity ? (
                <ChartComponent title="Pasos por Actividad - Apple Watch" data={chartData} options={options} />
            ) : (
                <p>Cargando datos o selecciona una actividad...</p>
            )}
        </div>
    );
};

export default ActivityChart;