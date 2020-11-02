
export default {
  namespaced: true,
  state: {
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
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    todos(state) {
      return state.todos
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo)
      }, 100)
    },
    updateTodo(context, todo) {
      setTimeout(() => {
        context.commit('updateTodo', todo)
      }, 100)
    },
    deleteTodo(context, id) {
      setTimeout(() => {
        context.commit('deleteTodo', id)
      }, 100)
    },
  },
}
