<template>
  <div :key="task.id" v-for="task in tasks">

    <Task @toggle-reminder="$emit('toggle-reminder', $event)"
          @delete-task="$emit('delete-task2', task.id)" :task="task"/>

    <!-- with sending $event a few levels up -->
    <!--
    <Task @delete-task="$emit('delete-task2', $event)" :task="task"/>
    -->

    <!-- without Task component
    <h3>{{ task.text }}</h3>
    <p>{{ task.day}}</p>
    -->
  </div>
</template>

<script>
import Task from "./Task"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tasks",
  props: {
    tasks: Array
  },
  components: {
    Task
  },
  emits: ["delete-task2", "toggle-reminder"]
}
</script>

