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
            {/* Sección para mostrar los resúmenes tanto de Apple Watch como de Fitbit */}

            <div className="summary-column">
                {/* Columna que contiene el resumen de los datos del Apple Watch */}
                <h2>Resumen de Datos del Apple Watch</h2>
                {Object.keys(summary.applewatch).length > 0 ? (
                    // Si hay datos disponibles, mostrarlos
                    <div className="summary-container">
                        {Object.entries(summary.applewatch).map(([activity, data]) => (
                            // Iterar sobre cada actividad y mostrar los datos correspondientes
                            <div key={activity} className="summary-item">
                                <h3>{activity}</h3>
                                {/* Mostrar la cantidad total de pasos */}
                                <p>Pasos Totales: {data.steps.toFixed(2)}</p>
                                {/* Mostrar la cantidad total de calorías quemadas */}
                                <p>Calorías Quemadas: {data.calories.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Mostrar mensaje mientras se cargan los datos
                    <p>Cargando resumen del Apple Watch...</p>
                )}
            </div>

            <div className="summary-column">
                {/* Columna que contiene el resumen de los datos del Fitbit */}
                <h2>Resumen de Datos del Fitbit</h2>
                {Object.keys(summary.fitbit).length > 0 ? (
                    // Si hay datos disponibles, mostrarlos
                    <div className="summary-container">
                        {Object.entries(summary.fitbit).map(([activity, data]) => (
                            // Iterar sobre cada actividad y mostrar los datos correspondientes
                            <div key={activity} className="summary-item">
                                <h3>{activity}</h3>
                                {/* Mostrar la cantidad total de pasos */}
                                <p>Pasos Totales: {data.steps.toFixed(2)}</p>
                                {/* Mostrar la cantidad total de calorías quemadas */}
                                <p>Calorías Quemadas: {data.calories.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Mostrar mensaje mientras se cargan los datos
                    <p>Cargando resumen del Fitbit...</p>
                )}
            </div>
        </div>
    );
};

export default SummariesPage;
