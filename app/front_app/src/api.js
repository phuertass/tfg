/**
 * Realiza una solicitud HTTP GET a la URL proporcionada y devuelve los datos en formato JSON.
 *
 * @async
 * @function fetchData
 * @param {string} url - La URL a la que se realizará la solicitud.
 * @returns {Promise<Object>} Un objeto que contiene los datos obtenidos de la API o un objeto vacío en caso de error.
 */
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        return { documents: [] };
    }
};