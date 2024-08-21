

<template>
  <div v-if="geojsonData && geojsonData.properties" class="">
    <div class="btn-group">
      <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        Informations
      </button>
      <ul class="dropdown-menu">
        <li class="p-2">Vitesse du vent (noeuds) : {{ geojsonData.properties["WMO_WIND"] || 'N/A' }}</li>
        <li class="p-2">Pression atmosphérique (hPa) : {{ geojsonData.properties["WMO_PRES"] || 'N/A' }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"> 

import type {GeoJSONFeature} from "ol/format/GeoJSON";

const props = defineProps<{
  geojsonData?: GeoJSONFeature;
}>();

</script>

<style scoped>
.dropdown-menu {
  width: auto;
}

.dropdown-menu li {
  white-space: nowrap;
}
</style>