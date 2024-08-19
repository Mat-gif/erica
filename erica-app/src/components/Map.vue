<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default defineComponent({
  name: 'OpenLayersMap',
  setup() {
    const mapContainer = ref(null);

    onMounted(() => {
      new Map({
        target: mapContainer.value,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [16755203.32, -1679201.48], // Le Pacifique Sud-Est
          zoom:4,
        }),
      });
    });

    return {
      mapContainer,
    };
  },
});
</script>

<style>
.map-container {
  width: 70vw;
  height: 70vh;
}
</style>
