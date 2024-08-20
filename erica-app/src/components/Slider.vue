<template>
  <div class="mt-4">
    <Slider
        v-model="localValue"
        :max="max"
        :format="formatTooltip"
        :show-tooltip="'always'"
        :step="1"
        @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import Slider from '@vueform/slider';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  formatTooltip: {
    type: Function,
    required: true,
  }
});

const emit = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(() => props.value, (newValue) => {
  localValue.value = newValue;
});

function handleInput(value: number) {
  emit('update:value', value);
}
</script>

<style src="@vueform/slider/themes/default.css"></style>