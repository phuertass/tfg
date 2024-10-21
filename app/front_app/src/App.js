import React, { useEffect, useState } from 'react';
import './App.css';
import ActivityChart from './components/ActivityChart';
import FilterSection from './components/FilterSection';
import FilteredDataTable from './components/FilteredDataTable';
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

    return (
        <div className="App">
            <h1>Datos de Salud - Comparaciones de Relojes Inteligentes</h1>
            <ActivityChart awData={awData} />
            <FilterSection
                awData={awData}
                setSelectedDevice={setSelectedDevice}
                setSelectedAge={setSelectedAge}
                setSelectedActivity={setSelectedActivity}
            />
            <FilteredDataTable filteredData={filteredData} />
        </div>
    );
}

export default App;
