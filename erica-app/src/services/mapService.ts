
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Icon, Stroke, Style} from "ol/style";
import type {GeoJSONFeature, GeoJSONFeatureCollection} from "ol/format/GeoJSON";


// initialise la map avec le fond de carte
export function initializeMap(mapContainer: HTMLElement): Map {
    return new Map({
        target: mapContainer,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                source: new VectorSource(),
            }),
        ],
        view: new View({
            center: [16755203.32, -1679201.48], // Le Pacifique Sud-ouest
            zoom: 4,
        }),
    });
}

// style du point en se basant sur un .svg
export const pointStyle = () => {
    return new Style({
        image: new Icon({
            src: '/hurricane2.svg',
            scale: 1,
        }),
    });
};

// style de la trajectoire
export const trajectoryStyle = () => {
    return new Style({
        stroke: new Stroke({
            color: '#FF0000',
            width: 2,
        }),
    });
};

// formatage sous dans un tableau des coordonnées
export const getTrajectoryCoordinates = (allGeojsonData:GeoJSONFeatureCollection )=>{
    return allGeojsonData.features.flatMap((feature: GeoJSONFeature) => {
        if (feature.geometry.type === 'MultiLineString') {
            return (feature.geometry.coordinates as number[][][]).map((segment: number[][]) => segment);
        }
        return [];
    });
}
