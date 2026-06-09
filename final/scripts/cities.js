export async function getCities() {
    try {
        const response = await fetch('data/cities.json');
        const data = await response.json();
        return data.cities;
    } catch (error) {
        console.error('Failed to fetch cities:', error);
        return [];
    }
}