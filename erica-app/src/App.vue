<template>
  <div class="container-fluid p-4">
    <Slider class="w-100 mb-4 mt-4"/>
    <Map class="w-100"/>
    <pre>{{ geojsonData }}</pre>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
import {onMounted, ref} from "vue";

const geojsonData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/data/erica_points.geojson');
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }
    geojsonData.value = (await response.json())["features"];
  } catch (error) {
    console.error('Error : ', error);
  }
});



</script>

<style scoped>
/* Vos styles ici */
</style>
