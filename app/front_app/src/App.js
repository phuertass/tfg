import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import GraphsPage from './pages/GraphsPage';
import FilteredDataPage from './pages/FilteredDataPage';
import SummariesPage from './pages/SummariesPage';
import { fetchData } from './api';

/**
 * Componente principal de la aplicación para mostrar comparaciones de datos de salud.
 *
 * @component
 * @returns {JSX.Element} El componente principal de la aplicación.
 */
function App() {
    // Estados para almacenar todos los datos de Apple Watch y Fitbit
    const [awData, setAwData] = useState({ documents: [] });
    const [fitbitData, setFitbitData] = useState({ documents: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [summary, setSummary] = useState({ applewatch: {}, fitbit: {} });

    // Obtener datos de la API
    useEffect(() => {
        async function loadData() {
            const awData = await fetchData('http://127.0.0.1:8000/documents/health_data/aw_data');
            setAwData(awData);

            const fitbitData = await fetchData('http://127.0.0.1:8000/documents/health_data/fitbit_data');
            setFitbitData(fitbitData);
        }

        loadData();
    }, []);

    // Manejar cambios en los filtros y actualizar los datos filtrados
    useEffect(() => {
        let data = [];

        if (selectedDevice) {
            if (selectedDevice.value === 'applewatch') {
                data = awData.documents;
            } else if (selectedDevice.value === 'fitbit') {
                data = fitbitData.documents;
            }
        } else {
            data = [...awData.documents, ...fitbitData.documents];
        }

        if (selectedAge) {
            const [minAge, maxAge] = selectedAge.value.split('-');
            data = data.filter(doc => {
                const age = doc.age;
                return maxAge ? age >= minAge && age <= maxAge : age >= minAge;
            });
        }

        if (selectedActivity) {
            data = data.filter(doc => doc.activity_trimmed === selectedActivity.value);
        }

        setFilteredData(data);
    }, [selectedDevice, selectedAge, selectedActivity, awData, fitbitData]);

    // Calcular el resumen de los datos
    useEffect(() => {
        if (awData.documents.length > 0) {
            const summaryAW = awData.documents.reduce((acc, doc) => {
                const activity = doc.activity_trimmed;
                if (!acc[activity]) {
                    acc[activity] = { steps: 0, calories: 0 };
                }
                acc[activity].steps += doc.Applewatch.Steps_LE;
                acc[activity].calories += doc.Applewatch.Calories_LE;
                return acc;
            }, {});
            setSummary(prevSummary => ({ ...prevSummary, applewatch: summaryAW }));
        }

        if (fitbitData.documents.length > 0) {
            const summaryFitbit = fitbitData.documents.reduce((acc, doc) => {
                const activity = doc.activity_trimmed;
                if (!acc[activity]) {
                    acc[activity] = { steps: 0, calories: 0 };
                }
                acc[activity].steps += doc.Fitbit.Steps_LE;
                acc[activity].calories += doc.Fitbit.Calories_LE;
                return acc;
            }, {});
            setSummary(prevSummary => ({ ...prevSummary, fitbit: summaryFitbit }));
        }
    }, [awData, fitbitData]);

    return (
        <Router>
            <div className="App">
                <h1>Datos de Salud - Comparaciones de Relojes Inteligentes</h1>
                <nav>
                    <Link to="/">Inicio</Link> | <Link to="/filtered-data">Datos Filtrados</Link> | <Link to="/graphs">Gráficas</Link>
                </nav>
                <Routes>
                    {/*<Route
                        path="/"
                        element={
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
                        }
                    />*/}
                    <Route
                        path="/"
                        element={<SummariesPage summary={summary} />}
                    />
                    <Route
                        path="/filtered-data"
                        element={
                            <FilteredDataPage
                                awData={awData}
                                fitbitData={fitbitData}
                                setSelectedDevice={setSelectedDevice}
                                setSelectedAge={setSelectedAge}
                                setSelectedActivity={setSelectedActivity}
                                filteredData={filteredData}
                            />
                        }
                    />
                    <Route
                        path="/graphs"
                        element={
                            <GraphsPage awData={awData} />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
