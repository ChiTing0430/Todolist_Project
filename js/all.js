var app = new Vue({
    el: '#app',
    // 資料結構
    data: {
        newtodo: '',
        Todos: [{
            id: '123',
            title: '你好，這是我的 Todo list 練習',
            completed: false
        }],
        visbility: 'all',
        cacheTodo: {},
        cacheTitle: '',
    },
    // 使用哪些方法
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
    // 做了那些處理
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
        undone: function() {
            var undone = [];
            this.Todos.forEach((item) => {
                if (!item.completed) {
                    undone.push(item)
                }
            })
            return undone.length;
        }
    }
})