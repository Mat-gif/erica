<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";

const props = defineProps<{
  geojsonData: any;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<Map | null>(null);
const vectorLayer = ref<VectorLayer<VectorSource> | null>(null);
const vectorSource = ref<VectorSource | null>(null);

onMounted(() => {
  map.value = new Map({
    target: mapContainer.value as HTMLElement,
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
      zoom:4,
    }),
  });
  vectorLayer.value = map.value.getLayers().item(1) as VectorLayer<VectorSource>;
  vectorSource.value = vectorLayer.value.getSource() as VectorSource;
});

watch(
    () => props.geojsonData,
    (newGeojsonData) => {
      if (newGeojsonData) {
        // Creer un point
        const point = new Feature({
          geometry: new Point(fromLonLat(newGeojsonData.geometry.coordinates)),
        });


        const iconStyle = new Style({
          image: new Icon({
            src: '/hurricane2.svg',
            scale:1
          }),
        });

        point.setStyle(iconStyle);


        vectorSource.value?.clear(); // Efface les anciens points
        vectorSource.value?.addFeature(point); // Ajoute le nouveau point
        map.value?.getView().setCenter(fromLonLat(newGeojsonData.geometry.coordinates));// Recentrez
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
