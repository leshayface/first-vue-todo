<template>
  <div class="md:w-1/2">
    <div class="w-auto flex items-center border-b border-teal-500 py-2 my-6">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="What do you need to do mannn?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      /> <!-- use v-model to bind data property -->
    </div>
    <p>TODO LIST</p>
    <div class="space-y-4 my-6">
      <todo
        class="border border-gray-400 rounded-b flex flex-col justify-between leading-normal p-4"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      > <!-- grab each item from array as well as its index -->
      </todo>
    </div>
    <todo-items-remaining></todo-items-remaining>
     <!-- <div>{{ remaining }} items left</div> computed properties can be referred to like data properties -->
  </div>
</template>

<script>
import Todo from './Todo'
import TodoItemsRemaining from './TodoItemsRemaining'

export default {
  name: 'todo-list',
  components: {
    Todo,
    TodoItemsRemaining,
  },
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      idForTodo: 3,
    }
  },
  methods: {
    addTodo() {
      //use this keyword to access data
      //make sure no empty todo can be added
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.$store.dispatch('addTodo', {
        id: this.idForTodo, //sets the new todo id to 3
        title: this.newTodo, //grab text from input (v-model) - two way data binding
      })
      this.newTodo = ''; //set newTodo text to empty
      this.idForTodo++; //increment idForTodo for next todo
    }
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todos() {
      return this.$store.getters.todos
    }
  }, //computed property is for composing new data derived from other data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
