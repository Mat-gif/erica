<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {initializeMap} from "@/services/mapService";

import { Feature } from 'ol';
import {Geometry, Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";

const props = defineProps<{
  geojsonData: any;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<Map | null>(null);
const vectorSource = ref<VectorSource | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    map.value = initializeMap(mapContainer.value);
    const vectorLayer = map.value.getLayers().item(1) as VectorLayer<VectorSource>;
    vectorSource.value = vectorLayer.getSource() as VectorSource<Feature<Geometry>>;

  }
});

watch(
    () => props.geojsonData,
    (newGeojsonData) => {
      if (newGeojsonData && vectorSource.value && map.value ) {
        const point = new Feature({
          geometry: new Point(fromLonLat(newGeojsonData.geometry.coordinates)),
        });

        const iconStyle = new Style({
          image: new Icon({
            src: '/hurricane2.svg',
            scale: 1,
          }),
        });

        point.setStyle(iconStyle);

        vectorSource.value.clear(); // Efface les anciens points
        vectorSource.value.addFeature(point); // Ajoute le nouveau point
        map.value.getView().setCenter(fromLonLat(newGeojsonData.geometry.coordinates)); // Recentre
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
