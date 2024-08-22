import type {GeoJSONFeatureCollection} from "ol/format/GeoJSON";
// importer les données au format geojson
export async function fetchGeojsonData(url: string): Promise<GeoJSONFeatureCollection> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
    }
    return await response.json();
}