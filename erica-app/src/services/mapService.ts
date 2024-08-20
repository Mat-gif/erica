// src/services/mapServices.ts

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


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
            center: [16755203.32, -1679201.48], // Le Pacifique Sud-Est
            zoom: 4,
        }),
    });
}
