<template>
  <div class="w-1/2">
    <div class="w-auto flex items-center border-b border-teal-500 py-2 m-6">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="What do you need to do mannn?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      /> <!-- use v-model to bind data property -->
    </div>
    <p>TODO LIST</p>
    <todo
      class="border border-gray-400 rounded-b flex flex-col justify-between leading-normal m-6 p-4"
      v-for="(todo, index) in todos"
      :key="todo.id" :todo="todo"
      :index="index"
      @removedTodo="removeTodo"
      @finishedEdit="finishedEdit"
    > <!-- grab each item from array as well as its index -->
    </todo>
    <div>{{ remaining }} items left</div>
     <!-- <div>{{ remaining }} items left</div> computed properties can be referred to like data properties -->
  </div>
</template>

<script>
import Todo from './Todo'

export default {
  name: 'todo-list',
  components: {
    Todo,
  },
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      idForTodo: 3,
      todos: [
        {
          'id': 1,
          'title': 'Finish Building This App',
          'completed': false,
          'editing': false
        },
        {
          'id': 2,
          'title': 'Take Over The World!',
          'completed': false,
          'editing': false
        },
      ]
    }
  },
  methods: {
    addTodo() {
      //use this keyword to access data

      //make sure no empty todo can be added
      if (this.newTodo.trim().length == 0) {
        return
      }

      console.log(this.idForTodo);

      this.todos.push(
        {
          id: this.idForTodo, //sets the new todo id to 3
          title: this.newTodo, //grab text from input (v-model) - two way data binding
          completed: false,
          editing: false
        }
      )

      this.newTodo = ''; //set newTodo text to empty
      this.idForTodo++; //increment idForTodo for next todo
    },
    removeTodo(index) {
      this.todos.splice(index, 1); //splice todo array by index and remove 1 item
    },
    finishedEdit(data) {
      const index = this.todos.findIndex((item) => item.id == data.id)
      this.todos.splice(index, 1, data)
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
  }, //computed property is for composing new data derived from other data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
