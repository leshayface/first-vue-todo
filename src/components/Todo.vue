<template>
  <div>
    <div class="flex flex-row">
      <div class="w-1/5 flex items-center">
        <input type="checkbox" v-model="completed" @change="doneEditing" /> <!-- bind completed property to checkbox -->
      </div>
      <div class="w-3/5">
        <p v-bind:class="{'line-through': todo.completed}" v-if="!editing" @dblclick="editTodo(todo)">{{title}}</p> <!-- if editing isnt true, display the todo item -->
        <!-- if editing is true, display the editing input. End editing on enter / blur. On escape key call cancelEditing method -->
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none text-center"
          v-else type="text"
          v-model="title"
          @blur="doneEditing(todo)"
          @keyup.enter="doneEditing(todo)"
          @keyup.esc="cancelEditing(todo)"
          v-focus
        />
      </div>
      <div class="w-1/5 text-right">
        <h3 @click="removeTodo(index)">X</h3> <!-- on click call removeTodo method -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'todo',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
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
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      removeTodo(index) {
        this.$emit('removedTodo', index)
      },
      editTodo() {
        this.beforeEditCache = this.title;
        this.editing = true;
      },
      doneEditing() {
        //if edited title is empty set it to the previous text
        if (this.title.trim() == '') {
          this.title = this.beforeEditCache
        }
        this.editing = false
        this.$emit('finishedEdit', {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
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