new Vue({
    el: '#app',
    data() {
      return {
        title: '',
        description: '',
        important: false,
        editMode: false,
        editIndex: null,
        showAlert: false,
        alertMessage: '',
        tasks: []
      };
    },
    created() {
      this.loadTasks();
    },
    methods: {
      loadTasks() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      },
      handleSubmit() {
        if (this.title.trim() === '') {
          this.alertMessage = 'Title cannot be empty.';
          this.showAlert = true;
          return;
        }

        if (this.editMode) {
          this.tasks[this.editIndex] = {
            title: this.title,
            description: this.description,
            important: this.important
          };
          this.alertMessage = 'Task updated successfully.';
        } else {
          const task = {
            title: this.title,
            description: this.description,
            important: this.important
          };
          this.tasks.push(task);
          this.alertMessage = 'Task added successfully.';
        }

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.loadTasks();
        this.resetForm();
        this.showAlert = true;
      },
      editTask(index) {
        const task = this.tasks[index];
        this.title = task.title;
        this.description = task.description;
        this.important = task.important;
        this.editIndex = index;
        this.editMode = true;
      },
      deleteTask(index) {
        this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.alertMessage = 'Task deleted successfully.';
        this.showAlert = true;
      },
      resetForm() {
        this.title = '';
        this.description = '';
        this.important = false;
        this.editMode = false;
        this.editIndex = null;
      },
      closeAlert() {
        this.showAlert = false;
      }
    }
  });