<template>
  <div>{{ data }}</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const data = 9;
    return { data };
  },
});
</script>
