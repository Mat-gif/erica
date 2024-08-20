<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {initializeMap, pointPosition} from "@/services/mapService";

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
    vectorSource.value = vectorLayer.getSource() as VectorSource;
  }
});

watch(
    () => props.geojsonData,
    (newGeojsonData) => {
      if (newGeojsonData && vectorSource.value && map.value) {
        pointPosition(newGeojsonData.geometry.coordinates, vectorSource.value, map.value);
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
