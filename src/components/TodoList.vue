<template>
  <div class="md:w-1/2">
    <div class="w-auto flex items-center border-b border-green-600 py-2 my-6">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="What do you need to do mannn?"
        v-model="newTodo"
        @keyup.enter="addNewTodo()"
      /> <!-- use v-model to bind data property -->
    </div>
    <p>TODO LIST</p>
    <draggable v-model="todos">
      <transition-group>
        <todo
          class="space-y-4 my-6 border border-gray-400 rounded flex flex-col justify-between leading-normal p-4 cursor-pointer"
          v-for="todo in todos"
          :key="todo.title"
          :todo="todo"
        > 
          {{todo.title}}
        </todo>
      </transition-group>
    </draggable>
    <todo-items-remaining></todo-items-remaining>
     <!-- <div>{{ remaining }} items left</div> computed properties can be referred to like data properties -->
  </div>
</template>

<script>
import Todo from './Todo'
import TodoItemsRemaining from './TodoItemsRemaining'
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'todo-list',
  components: {
    Todo,
    TodoItemsRemaining,
    draggable,
  },
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
    }
  },
  methods: {
    ...mapActions({
      addTodo: 'todo/addTodo',
    }),
    addNewTodo() {
      //use this keyword to access data
      //make sure no empty todo can be added
      if (this.newTodo.trim().length === 0) {
        return
      }
      console.log(this.todos.length);
      // pass payload to action
      this.addTodo({
        id: this.todos.length+1, //sets the new todo id to the array length plus 1
        title: this.newTodo, //grab text from input (v-model) - two way data binding
      })

      this.newTodo = ''; //set newTodo text to empty
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters('todo',{
      remaining: 'remaining',
      todos: 'todos'
    }),
  }, //computed property is for composing new data derived from other data
}
</script>
