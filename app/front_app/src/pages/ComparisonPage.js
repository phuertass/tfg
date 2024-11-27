import React from 'react';
import '../styles/ComparisonPage.css';

/**
 * Página para comparar los datos de los dispositivos Apple Watch y Fitbit de manera visual.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.awData - Datos del Apple Watch.
 * @param {Object} props.fitbitData - Datos del Fitbit.
 * @returns {JSX.Element} El componente de la página de comparación.
 */
const ComparisonPage = ({ awData, fitbitData }) => {
    // Obtener todas las actividades únicas de ambos dispositivos
    const activities = [...new Set([...awData.documents, ...fitbitData.documents].map(doc => doc.activity_trimmed))];

    // Calcular los promedios de calorías, pasos, ritmo cardíaco, y distancia por tipo de actividad para Apple Watch
    const awAverages = activities.map(activity => {
        const filteredDocs = awData.documents.filter(doc => doc.activity_trimmed === activity);
        const totalCalories = filteredDocs.reduce((sum, doc) => sum + doc.Applewatch.Calories_LE, 0);
        const totalSteps = filteredDocs.reduce((sum, doc) => sum + doc.Applewatch.Steps_LE, 0);
        const totalHeartRate = filteredDocs.reduce((sum, doc) => sum + doc.Applewatch.Heart_LE, 0);
        const totalDistance = filteredDocs.reduce((sum, doc) => sum + doc.Applewatch.Distance_LE, 0);
        const count = filteredDocs.length;
        return {
            activity,
            avgCalories: count > 0 ? (totalCalories / count).toFixed(2) : 'N/A',
            avgSteps: count > 0 ? (totalSteps / count).toFixed(2) : 'N/A',
            avgHeartRate: count > 0 ? (totalHeartRate / count).toFixed(2) : 'N/A',
            avgDistance: count > 0 ? (totalDistance / count).toFixed(2) : 'N/A'
        };
    });

    // Calcular los promedios de calorías, pasos, ritmo cardíaco, y distancia por tipo de actividad para Fitbit
    const fitbitAverages = activities.map(activity => {
        const filteredDocs = fitbitData.documents.filter(doc => doc.activity_trimmed === activity);
        const totalCalories = filteredDocs.reduce((sum, doc) => sum + doc.Fitbit.Calories_LE, 0);
        const totalSteps = filteredDocs.reduce((sum, doc) => sum + doc.Fitbit.Steps_LE, 0);
        const totalHeartRate = filteredDocs.reduce((sum, doc) => sum + doc.Fitbit.Heart_LE, 0);
        const totalDistance = filteredDocs.reduce((sum, doc) => sum + doc.Fitbit.Distance_LE, 0);
        const count = filteredDocs.length;
        return {
            activity,
            avgCalories: count > 0 ? (totalCalories / count).toFixed(2) : 'N/A',
            avgSteps: count > 0 ? (totalSteps / count).toFixed(2) : 'N/A',
            avgHeartRate: count > 0 ? (totalHeartRate / count).toFixed(2) : 'N/A',
            avgDistance: count > 0 ? (totalDistance / count).toFixed(2) : 'N/A'
        };
    });

    return (
        <div className="comparison-page">
            <h2>Comparación de Datos de Apple Watch y Fitbit</h2>
            <div className="comparison-table">
                <table>
                    <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>Apple Watch - Promedio de Calorías</th>
                        <th>Fitbit - Promedio de Calorías</th>
                        <th>Apple Watch - Promedio de Pasos</th>
                        <th>Fitbit - Promedio de Pasos</th>
                        <th>Apple Watch - Promedio de Ritmo Cardíaco</th>
                        <th>Fitbit - Promedio de Ritmo Cardíaco</th>
                        <th>Apple Watch - Promedio de Distancia</th>
                        <th>Fitbit - Promedio de Distancia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity, index) => (
                        <tr key={activity}>
                            <td>{activity}</td>
                            <td>{awAverages[index].avgCalories}</td>
                            <td>{fitbitAverages[index].avgCalories}</td>
                            <td>{awAverages[index].avgSteps}</td>
                            <td>{fitbitAverages[index].avgSteps}</td>
                            <td>{awAverages[index].avgHeartRate}</td>
                            <td>{fitbitAverages[index].avgHeartRate}</td>
                            <td>{awAverages[index].avgDistance}</td>
                            <td>{fitbitAverages[index].avgDistance}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonPage;
