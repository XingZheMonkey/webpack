<template>
  <div>{{ data }}</div>
  <aaa-b/>
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
