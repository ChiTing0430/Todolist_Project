var app = new Vue({
    el: '#app',
    data: {
        newtodo: '',
        Todos: [{
            id: '345',
            title: '你好嗎?',
            completed: false
        }],
        visbility: 'all',
        cacheTodo: {},
        cacheTitle: '',
    },
    methods: {
        addtodo: function() {
            // .trim() 清除多餘的空白
            var addtodovalue = this.newtodo.trim();
            var timestamp = Math.floor(Date.now())
            if (!addtodovalue) {
                return;
            }
            this.Todos.push({
                id: timestamp,
                title: addtodovalue,
                completed: false
            });
            this.newtodo = '';
        },
        removetodo: function(Todos) {
            var newIndex = '';
            this.Todos.forEach((item, key) => {
                if (item.id === Todos.id) {
                    newIndex = key;
                }
            })
            this.Todos.splice(newIndex, 1)
        },
        edittodo: function(item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function() {
            this.cacheTodo = {};
        },
        doneEdit: function(item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        },
        clearallTodos: function() {
            this.Todos = [];
        }
    },
    computed: {
        filteredTodos: function() {
            if (this.visbility == 'all') {
                return this.Todos;
            } else if (this.visbility == 'active') {
                var newtodo = [];
                this.Todos.forEach((item) => {
                    if (!item.completed) {
                        newtodo.push(item);
                    }
                })
                return newtodo;
            } else if (this.visbility == 'completed') {
                var newtodo = [];
                this.Todos.forEach((item) => {
                    if (item.completed) {
                        newtodo.push(item);
                    }
                })
                return newtodo;
            }
            return [];
        },
        undoneRecords: function() {
            var undoneRecords = [];
            this.todos.forEach(function(item) {
                if (!item.completed) {
                    undoneRecords.push(item);
                }
            })
            return undoneRecords.length;
        }
    },
})