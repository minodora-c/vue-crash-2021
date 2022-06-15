<template>
  <div :key="task.id" v-for="task in tasks">
    <h3>{{ task.text }}</h3>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tasks",
  props: {
    tasks: Array
  }
}
</script>