export async function fetchGeojsonData(url: string): Promise<any[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data = await response.json();
        return data.features || [];
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}
