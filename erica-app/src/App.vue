<template>
  <div class="container-fluid p-4 w-75">
    <Map class="w-100" :geojsonData="geojsonData"/>
    <Slider
        class="w-100 mb-4 mt-4"
        :value="value"
        :max="max"
        :formatTooltip="formatTooltip"
        @update:value="handleValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
import { getformatTooltip } from '@/services/tooltipService';
import {fetchGeojsonData} from "@/services/dataService";

const value = ref(0);
const geojsonData = ref<any>(null);
const allGeojsonData = ref<any[]>([]);
const max = computed(() => allGeojsonData.value.length - 1);

onMounted(async () => {
  const url = '/data/erica_points.geojson';
  allGeojsonData.value = await fetchGeojsonData(url);
  geojsonData.value = allGeojsonData.value[value.value];
});

function handleValueChanged(newValue: number) {
  value.value = newValue;
  geojsonData.value = allGeojsonData.value[newValue];
}

function formatTooltip(val: number) {
  return getformatTooltip(val, allGeojsonData.value);
}

</script>

<style scoped></style>
