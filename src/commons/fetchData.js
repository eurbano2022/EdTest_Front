import { URL_BACKEND } from './constants';

export const fetchLevels = async () => {
    try {
        const response = await fetch(`${URL_BACKEND}/levels`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error);
    }
};
export const fetchProcessAreas = async () => {
    try {
        const response = await fetch(`${URL_BACKEND}/processAreas`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonData = await response.json();
        const result = jsonData.reduce((resultArray, item) => {
            const { level } = item;

            if (!resultArray[level.id]) {
                resultArray[level.id] = []; // Crea un nuevo subarreglo si no existe
            }

            resultArray[level.id].push(item); // Agrega el elemento al subarreglo correspondiente

            return resultArray;
        }, []);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCriteria = async () => {
    try {
        const response = await fetch(`${URL_BACKEND}/criteria`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const jsonData = await response.json();
        const result = jsonData.reduce((resultArray, item) => {
            const { processArea } = item;

            if (!resultArray[processArea.id]) {
                resultArray[processArea.id] = []; // Crea un nuevo subarreglo si no existe
            }

            resultArray[processArea.id].push(item); // Agrega el elemento al subarreglo correspondiente

            return resultArray;
        }, []);
        return result;
    } catch (error) {
        console.log(error);
    }
};
