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
            // Llamadas a la API para obtener los datos del Apple Watch y Fitbit
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

        // Filtrar los datos según el dispositivo seleccionado
        if (selectedDevice) {
            if (selectedDevice.value === 'applewatch') {
                data = awData.documents;
            } else if (selectedDevice.value === 'fitbit') {
                data = fitbitData.documents;
            }
        } else {
            // Si no se selecciona ningún dispositivo, combinar los datos de ambos dispositivos
            data = [...awData.documents, ...fitbitData.documents];
        }

        // Filtrar los datos según el rango de edad seleccionado
        if (selectedAge) {
            const [minAge, maxAge] = selectedAge.value.split('-');
            data = data.filter(doc => {
                const age = doc.age;
                return maxAge ? age >= minAge && age <= maxAge : age >= minAge;
            });
        }

        // Filtrar los datos según la actividad seleccionada
        if (selectedActivity) {
            data = data.filter(doc => doc.activity_trimmed === selectedActivity.value);
        }

        setFilteredData(data);
    }, [selectedDevice, selectedAge, selectedActivity, awData, fitbitData]);

    // Calcular el resumen de los datos para el Apple Watch y Fitbit
    useEffect(() => {
        if (awData.documents.length > 0) {
            // Calcular el resumen para el Apple Watch
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
            // Calcular el resumen para el Fitbit
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
                {/* Barra de navegación para acceder a las distintas páginas */}
                <nav>
                    <Link to="/">Inicio</Link> | <Link to="/filtered-data">Datos Filtrados</Link> | <Link to="/graphs">Gráficas</Link>
                </nav>
                <Routes>
                    {/* Ruta para la página de inicio que muestra el resumen */}
                    <Route
                        path="/"
                        element={<SummariesPage summary={summary} />}
                    />
                    {/* Ruta para la página de datos filtrados */}
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
                    {/* Ruta para la página de gráficas */}
                    <Route
                        path="/graphs"
                        element={
                            <GraphsPage awData={awData} fitbitData={fitbitData} />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
