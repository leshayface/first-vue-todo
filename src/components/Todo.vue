<template>
  <div>
    <div class="flex flex-row">
      <div class="w-1/5 flex items-center">
        <input type="checkbox" v-model="completed" @change="doneEdit" /> <!-- bind completed property to checkbox -->
      </div>
      <div class="w-3/5" @click="completeTodo">
        <p v-bind:class="{'line-through': completed}" v-if="!editing" @dblclick="editTodo(todo)">{{title}}</p> <!-- if editing isnt true, display the todo item -->
        <!-- if editing is true, display the editing input. End editing on enter / blur. On escape key call cancelEditing method -->
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none text-center"
          v-else type="text"
          v-model="title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEditing(todo)"
          v-focus
        />
      </div>
      <div class="w-1/5 flex justify-end">
        <svg @click="deleteTodo(todo.id)" class="w-6 h-6 stroke-current text-grey-500 hover:text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <!-- <h3 @click="deleteTodo(todo.id)">X</h3> on click call removeTodo method -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'todo',
    props: {
      todo: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed,
        'editing': this.todo.editing,
        'beforeEditCache': '',
      }
    },
    directives: {
      // makes cursor focus on dblclick
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      ...mapActions([
        'deleteTodo',
        'updateTodo'
      ]),
      editTodo() {
        this.beforeEditCache = this.title;
        this.editing = true;
      },
      doneEdit() {
        //if edited title is empty set it to the previous text
        if (this.title.trim() == '') {
          this.title = this.beforeEditCache
        }
        this.editing = false
        // pass payload to action
        this.updateTodo({
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
        })
      },
      completeTodo() {
        // pass payload to action
        this.updateTodo({
          'id': this.id,
          'title': this.title,
          'completed': this.completed = !this.completed,
          'editing': this.editing,
        })
      },
      cancelEditing() {
        //set editing to false and set text back to its previous string
        this.editing = false;
        this.title = this.beforeEditCache
      }
    }
  }
</script>