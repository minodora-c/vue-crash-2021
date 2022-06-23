<template>
  <div v-show="showAddTaskPropHome">
    <AddTask @add-task="addTask"/>
  </div>
  <Tasks @toggle-reminder="toggleReminder" @delete-task2="deleteTask" :tasks="tasks"/>
</template>

<script>
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  props: {
    showAddTaskPropHome: Boolean,
  },
  components: {
    // the components you want on every single page
    AddTask,
    Tasks
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    async deleteTask(eventOrIdSameSame) {

      if (confirm("Are you sure you want to delete the Task?")) {

        await fetch(`api/tasks/${eventOrIdSameSame}`, {
          method: "DELETE"
        })

        this.tasks = await this.fetchTasks()

        // before backend was implemented
        /*
        this.tasks = this.tasks.filter((task) =>
                task.id !== eventOrIdSameSame
            //  { return task.id !== eventOrIdSameSame }
        )
         */
      }
    },
    async toggleReminder(eventOrIdSameSame) {

      // changing the reminder from the backend
      const taskToToggle = await this.fetchTask(eventOrIdSameSame.id)
      taskToToggle.reminder = !taskToToggle.reminder

      // changing the reminder from the frontend
      // const up = {reminder: !eventOrIdSameSame.reminder}

      // from Video
      // const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      await fetch(`api/tasks/${eventOrIdSameSame.id}`, {
        // with method: 'PUT' you would need to send the whole content up, otherwise it deletes it
        // with method: 'PATCH' you can only send the attribute to be changed or added
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(taskToToggle)
        // body: JSON.stringify(up)
        // body: JSON.stringify(updateTask)
      })

      this.tasks = await this.fetchTasks()

      // from before backend was implemented
      /*
      this.tasks = this.tasks.map((t) => {
            t.id === eventOrIdSameSame ? t.reminder = !t.reminder : t.reminder
            return t
          }
      )
       */

      // alternative from Video from before backend was implemented
      /*
      this.tasks = this.tasks.map((t) =>
          t.id === eventOrIdSameSame ? {...t, reminder: !t.reminder} : t
      )
      */
    },
    async fetchTasks() {
      const res = await fetch("api/tasks")
      const data = await res.json()
      return data
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()
      return data
    }
  },
  async created() {
    this.tasks = await this.fetchTasks()

    // beginning: write data in frontend
    /*
    this.tasks = [
      {
        "id": "1",
        "text": "Doctors Appointment",
        "day": "March 5th at 2:30pm",
        "reminder": true
      },
      {
        "id": "2",
        "text": "Meeting with boss",
        "day": "March 6th at 1:30pm",
        "reminder": true
      },
      {
        "id": "3",
        "text": "Food shopping",
        "day": "March 7th at 2:00pm",
        "reminder": false
      }
    ]
     */
  }
}
</script>