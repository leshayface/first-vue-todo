<template>
  <div class="flex flex-col items-center" id="app">
    <img src="./assets/logo.png">
    <todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import './assets/css/tailwind.css';

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
