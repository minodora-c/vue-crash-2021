<template>
  <header>
    <h1>{{ title }}</h1>
    <!-- <Button @btn-click="$emit('toggle-add-task')" text="Add Task" color="green" /> -->
    <Button @btn-click="$emit('toggle-add-task')" :text="showAddTaskProp ? 'Close' : 'Add Task'"
            :color="showAddTaskProp ? 'red' : 'green'"/>
  </header>
</template>

<script>
import Button from "./Button"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  // props: ['title'],
  props: {
    title: String,
    showAddTaskProp: Boolean
    /* title: {
      type: String,
      default: "Hello World"
    }
    */
  },
  components: {
    Button
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>