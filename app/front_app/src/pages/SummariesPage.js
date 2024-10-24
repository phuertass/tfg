import React from 'react';
import '../styles/SummariesPage.css';

/**
 * Componente para mostrar el resumen de los datos del Apple Watch y Fitbit.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.summary - Resumen de los datos de Apple Watch y Fitbit.
 * @returns {JSX.Element} El componente de la página de resúmenes.
 */
const SummariesPage = ({ summary }) => {
    return (
        <div className="summary-section">
            <div className="summary-column">
                <h2>Resumen de Datos del Apple Watch</h2>
                {Object.keys(summary.applewatch).length > 0 ? (
                    <div className="summary-container">
                        {Object.entries(summary.applewatch).map(([activity, data]) => (
                            <div key={activity} className="summary-item">
                                <h3>{activity}</h3>
                                <p>Pasos Totales: {data.steps.toFixed(2)}</p>
                                <p>Calorías Quemadas: {data.calories.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Cargando resumen del Apple Watch...</p>
                )}
            </div>
            <div className="summary-column">
                <h2>Resumen de Datos del Fitbit</h2>
                {Object.keys(summary.fitbit).length > 0 ? (
                    <div className="summary-container">
                        {Object.entries(summary.fitbit).map(([activity, data]) => (
                            <div key={activity} className="summary-item">
                                <h3>{activity}</h3>
                                <p>Pasos Totales: {data.steps.toFixed(2)}</p>
                                <p>Calorías Quemadas: {data.calories.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Cargando resumen del Fitbit...</p>
                )}
            </div>
        </div>
    );
};

export default SummariesPage;
