<template>
  <div class="container">
    <Header title="Task Tracker" @toggle-add-task="toggleAddTask" :showAddTaskProp="showAddTask"/>
    <div v-if="showAddTask">
      <AddTask @add-task="addTask"/>
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task2="deleteTask" :tasks="tasks"/>
    <Footer />
  </div>

</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

export default {
  name: 'App',
  components: {
    AddTask,
    Header,
    Footer,
    Tasks
  },
  data() {
    return {
      tasks: [],
      showAddTask: false
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
