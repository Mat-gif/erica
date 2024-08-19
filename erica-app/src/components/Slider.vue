<template>
  <div>
    <Slider v-model="value" />
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
      value: 20
    }
  }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>