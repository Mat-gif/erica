<template>
  <div class="container-fluid p-4 w-75">
    <Info   class="w-100 mb-4 mt-4" :geojsonData="geojsonData"/>
    <Map class="w-100" :geojsonData="geojsonData"/>
    <Slider
        class="w-100 mb-4 mt-4"
        :value="value"
        :max="max"
        :formatTooltip="formatTooltip"
        @update:value="handleValueChanged"
    /></div>
</template>

<script setup lang="ts">
/*
 * Composant principal
 */

import { ref, computed, onMounted } from 'vue';
import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
import { getformatTooltip } from '@/services/tooltipService';
import {fetchGeojsonData} from "@/services/dataService";
import Info from "@/components/Info.vue";

// déclaration des variables
const value = ref(0);
const geojsonData = ref<any>(null);
const allGeojsonData = ref<any[]>([]);
const max = computed(() => allGeojsonData.value.length - 1);

// quand le composant est monté je charge les données
onMounted(async () => {
  const url = '/data/erica_points.geojson';
  allGeojsonData.value = (await fetchGeojsonData(url)).features;
  geojsonData.value = allGeojsonData.value[value.value];
});

// écoute les valeurs index envoyé par le slider
function handleValueChanged(newValue: number) {
  value.value = newValue;
  geojsonData.value = allGeojsonData.value[newValue];
}

// transmet le contenu du tooltype du slider au bon format a chaque changement
function formatTooltip(val: number) {
  return getformatTooltip(val, allGeojsonData.value);
}

</script>

<style scoped></style>
