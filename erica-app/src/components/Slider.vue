<template>
  <div class="mt-4">
    <Slider
        v-model="value"
        :max="max"
        :format="formatTooltip"
        :show-tooltip="'always'"
        :step="1"
    />
  </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  components: {
    Slider,
  },
  data() {
    return {
      value: 0,
      geojsonData: null,
      allGeojsonData: [],
      max: 0,
    }
  },
  async mounted() {
      const response = await fetch('/data/erica_points.geojson');
      const data = await response.json();
      this.allGeojsonData = data["features"];
      this.max = this.allGeojsonData.length - 1;
      this.geojsonData = this.allGeojsonData[this.value];
  },
  computed: {
    formatTooltip() {
      return (val) => {
        if (this.allGeojsonData.length > 0) {
          return new Date(this.allGeojsonData[Math.round(val)]["properties"]["ISO_TIME"]).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        }
      };
    }
  },
  watch: {
    value(newValue) {
      this.geojsonData = this.allGeojsonData[newValue];
      this.$emit('geoDataChanged', {geojsonData: this.geojsonData});
    },
}
}
</script>

<style src="@vueform/slider/themes/default.css"></style>