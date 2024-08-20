import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

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


export function pointPosition(coordinates: number[], vectorSource: VectorSource, map: Map) {
    const point = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
    });

    const iconStyle = new Style({
        image: new Icon({
            src: '/hurricane2.svg',
            scale: 1,
        }),
    });

    point.setStyle(iconStyle);

    vectorSource.clear(); // Efface les anciens points
    vectorSource.addFeature(point); // Ajoute le nouveau point
    map.getView().setCenter(fromLonLat(coordinates)); // Recentre
}