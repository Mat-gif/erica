<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
/*
 * Utilise OpenLayers pour afficher une carte avec une trajectoire et un point dynamique.
 */

import { ref, watch, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { getTrajectoryCoordinates, initializeMap, pointStyle, trajectoryStyle } from "@/services/mapService";
import Feature from 'ol/Feature';
import { Geometry, MultiLineString, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import type { GeoJSONFeature, GeoJSONFeatureCollection } from 'ol/format/GeoJSON';
import {fetchGeojsonData} from "@/services/dataService";
import type {Coordinate} from "ol/coordinate";

const props = defineProps<{
  geojsonData?: GeoJSONFeature;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<Map | null>(null);
const vectorSource = ref<VectorSource<Feature<Geometry>> | null>(null);
const allGeojsonData = ref<GeoJSONFeatureCollection | null>(null);
const pointFeature = ref<Feature<Point> | null>(null);
const trajectoryFeature = ref<Feature<MultiLineString> | null>(null);

onMounted(async () => {
  // initialisation de la map
  if (mapContainer.value) {
    map.value = initializeMap(mapContainer.value);
    const vectorLayer = map.value.getLayers().item(1) as VectorLayer<VectorSource<Feature<Geometry>>>;
    vectorSource.value = vectorLayer.getSource() as VectorSource<Feature<Geometry>>;

    // chargement des données pour la trajectoire
    allGeojsonData.value = await fetchGeojsonData('/data/erica_track.geojson') as GeoJSONFeatureCollection;

    // formatage des données
    const trajectoryCoordinates = getTrajectoryCoordinates(allGeojsonData.value);
    const transformedCoordinates: Coordinate[][] = trajectoryCoordinates.map(line =>
        line.map(coord => fromLonLat(coord))
    );

    // ajout de la trajectoire globale
    if (transformedCoordinates.length > 0) {
      trajectoryFeature.value = new Feature({
        geometry: new MultiLineString(transformedCoordinates),
      });
      if (trajectoryFeature.value) {
        trajectoryFeature.value.setStyle(trajectoryStyle);
        vectorSource.value.addFeature(trajectoryFeature.value as Feature<MultiLineString>);
      }
    }
  }
});


watch(
    () => props.geojsonData,
    (newGeojsonData) => {
      // generation du nouveau point dynamiquement
      if (newGeojsonData && vectorSource.value && map.value) {
        const geoJSONFormat = new GeoJSON();
        const feature = geoJSONFormat.readFeature(newGeojsonData);
        if (feature instanceof Feature) {
          const geometry = feature.getGeometry();

          // creer un nouveau point
          if (geometry instanceof Point) {
            const point = new Feature({
              geometry: new Point(fromLonLat(geometry.getCoordinates())),
            });
            point.setStyle(pointStyle);

            // suppression de l'ancien sans supprimer la trajectoire
            if (pointFeature.value) {
              vectorSource.value.removeFeature(pointFeature.value  as Feature<Point>);
            }

            // ajout du nouveau point + recentrer la map
            pointFeature.value = point;
            vectorSource.value.addFeature(pointFeature.value  as Feature<Point>);
            map.value.getView().setCenter(fromLonLat(geometry.getCoordinates()));
          }
        }
      }
    },
    { deep: true }
);
</script>

<style>
.map-container {
  width: 70vw;
  height: 70vh;
}
</style>
