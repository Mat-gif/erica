<template>
  <div class="container-fluid p-4 w-75">
    <Map class="w-100" :geojsonData="geojsonData"/>
    <Slider class="w-100 mb-4 mt-4"   @geoDataChanged="handleValueChanged"/>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
import {handleError, ref} from "vue";


const geojsonData = ref<any>(null);

function handleValueChanged(payload: { geojsonData: any }) {
  geojsonData.value = payload.geojsonData;
}

</script>

<style scoped>


</style>
