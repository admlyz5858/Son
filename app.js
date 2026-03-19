class PomodoroTimer {
    constructor(workDuration, breakDuration) {
        this.workDuration = workDuration * 60;
        this.breakDuration = breakDuration * 60;
        this.currentSession = 'work';
        this.timeLeft = this.workDuration;
    }

    startTimer() {
        const interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft <= 0) {
                clearInterval(interval);
                this.switchSession();
            }
        }, 1000);
    }

    switchSession() {
        if (this.currentSession === 'work') {
            this.currentSession = 'break';
            this.timeLeft = this.breakDuration;
        } else {
            this.currentSession = 'work';
            this.timeLeft = this.workDuration;
        }
        this.startTimer();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        console.log(`Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
}

class TodoList {
    constructor() {
        this.tasks = this.loadTasks();
        this.render();
    }

    addTask(task) {
        this.tasks.push({ task, completed: false });
        this.saveTasks();
        this.render();
    }

    completeTask(index) {
        this.tasks[index].completed = true;
        this.saveTasks();
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    loadTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
        console.clear();
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.task} ${task.completed ? '(completed)' : ''}`);
        });
    }
}

class JokeGenerator {
    async fetchJoke() {
        const response = await fetch('https://api.jokes.one/joke/random');
        const data = await response.json();
        console.log(data.contents.jokes[0].joke.text);
    }
}

// Example usage:
const pomodoro = new PomodoroTimer(25, 5);
const todoList = new TodoList();
const jokeGenerator = new JokeGenerator();

// Start Pomodoro timer
pomodoro.startTimer();

// Add task to Todo list
// todoList.addTask('Finish Homework');
// todoList.completeTask(0);
// todoList.deleteTask(0);

// Fetch a joke
// jokeGenerator.fetchJoke();
