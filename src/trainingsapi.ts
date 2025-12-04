import type { TrainingForm } from './types';

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + 'trainings')
    .then(response => {
        if (!response.ok)
            throw new Error("Error when fetching trainings: " + response.statusText);

            return response.json();
        })
}

export const deleteTraining = async (id: number) => {
    const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Error deleting training: " + response.statusText);
    }
};

export function saveTraining(newTraining: TrainingForm) {
    return fetch(import.meta.env.VITE_API_URL + 'trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when saving training: " + response.statusText);
        return response.json();
    });
}