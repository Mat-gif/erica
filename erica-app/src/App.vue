<template>
  <div class="container-fluid">
    <Map />
    <pre>{{ geojsonData }}</pre>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import {onMounted, ref} from "vue";
import {log} from "ol/console";

const geojsonData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/data/erica_points.geojson');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    geojsonData.value = (await response.json())["features"];
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
});



</script>

<style scoped>
/* Vos styles ici */
</style>
