<template>
  <div class="home">
    <v-text-field
      v-model="newTask"
      class="pa-3"
      outlined
      label="Add task"
      append-icon="mdi-plus"
      hide-details
      clearable
      @click:append="addTask"
      @keyup.enter="addTask"
    ></v-text-field>

    <v-list flat class="pt-0">
      <div v-for="task in $store.state.tasks" :key="task.id">
        <v-list-item
          @click="toggleTask(task)"
          :class="{ 'blue lighten-5': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
                >{{ task.title }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-action v-if="task.done">
            <!-- <v-list-item-action> -->
              <v-btn icon @click.stop="deleteTask(task)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  created() {
    this.$store.commit('getTasks')
  },
  methods: {
    toggleTask(task) {
      this.$store.commit('toggleTask', task)
    },
    deleteTask(task) {
      this.$store.commit('deleteTask', task)
    },
    addTask() {     
      const task = {
        title: this.newTask,
        done: false,
        createdAt: new Date().toLocaleString(),
        id: Date.now().toString()
      }
      this.$store.commit('addTask', task)
      this.newTask = "";
    },
  },
};
</script>

<style scoped>
.v-list-item {
  height: 60px;
}
</style>
