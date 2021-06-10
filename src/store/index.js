import Vue from "vue";
import Vuex from "vuex";
import { db } from "../database/localbase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    tasks: [], 
    task: {}
  },
  mutations: {
    getTasks(state) {
      db.collection("todos")
        .get()
        .then((tasks) => {
          state.tasks = tasks;
        });
    },
    addTask(state, task) {
      db.collection('todos').doc(task.id).set(task)
      state.tasks.push(task)
    },
    deleteTask(state, task) {
      db.collection("todos").doc(task.id).delete();
      state.tasks = state.tasks.filter(item => item.id !== task.id)
    },
    toggleTask(state, payload) {
      state.task = state.tasks.find(item => item.id === payload.id)
      
      db.collection("todos").doc(payload.id).update({ done: !state.task.done });
      state.task.done = !state.task.done
    },
  },
  actions: {},
  getters: {},
  modules: {},
});
