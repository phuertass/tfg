import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ChartComponent from './ChartComponent';

/**
 * Componente para renderizar una gráfica de calorías según la actividad seleccionada para Apple Watch y Fitbit.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Object} props.fitbitData - Datos del Fitbit.
 * @param {Array} props.awData.documents - Array de documentos con actividades y datos del Apple Watch.
 * @param {Array} props.fitbitData.documents - Array de documentos con actividades y datos del Fitbit.
 * @returns {JSX.Element} El componente ActivityChart que renderiza la gráfica y un selector de actividad.
 */
const ActivityChart = ({ awData, fitbitData }) => {
    const [chartData, setChartData] = useState([['Activity', 'Apple Watch Calories', 'Fitbit Calories']]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Actualiza los datos de la gráfica según la actividad seleccionada
    useEffect(() => {
        if ((awData.documents.length > 0 || fitbitData.documents.length > 0) && selectedActivity) {
            const filteredAwData = awData.documents.filter(doc => doc.activity_trimmed ===
                selectedActivity.value);
            const formattedAwData = filteredAwData.map(doc => ['', doc.Applewatch.Calories_LE, null]);

            const filteredFitbitData = fitbitData.documents.filter(doc => doc.activity_trimmed ===
                selectedActivity.value);
            const formattedFitbitData = filteredFitbitData.map(doc => ['', null, doc.Fitbit.Calories_LE]);

            const combinedData = [...formattedAwData, ...formattedFitbitData];

            setChartData([['Activity', 'Apple Watch Calories', 'Fitbit Calories'], ...combinedData]);
        }
    }, [awData, fitbitData, selectedActivity]);

    // Opciones de actividades para el selector
    const activityOptions = [
        ...new Set([...awData.documents, ...fitbitData.documents].map(doc => doc.activity_trimmed))
    ].map(activity => ({
        value: activity,
        label: activity,
    }));

    // Opciones de configuración para la gráfica
    const options = {
        hAxis: { title: '' },
        vAxis: { title: 'Calories' },
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
            {(awData.documents.length > 0 || fitbitData.documents.length > 0) && selectedActivity ? (
                <ChartComponent title="Calorías por Actividad - Apple Watch y Fitbit" data={chartData}
                                options={options} />
            ) : (
                <p>Cargando datos o selecciona una actividad...</p>
            )}
        </div>
    );
};

export default ActivityChart;
