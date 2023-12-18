class TaskList extends HTMLElement {
    constructor() {
        super();

        this.tasks = [];
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        const addTaskButton = this.shadowRoot.getElementById('addTaskButton');
        addTaskButton.addEventListener('click', () => {
            const newTaskInput = this.shadowRoot.getElementById('newTaskInput');
            if (newTaskInput.value) {
                this.addTask(newTaskInput.value);
                newTaskInput.value = '';
            }
        });
    }

    addTask(taskText) {
        this.tasks.push({ text: taskText, completed: false });
        this.render();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.render();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 600px;
                    margin: 0 auto;
                    font-family: 'Arial', sans-serif;
                    
                }

                .addTasks {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                }

                .addTasks input {
                    flex: 1;
                    padding: 10px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    margin-right: 10px;
                }

                .addTasks button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .task {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin: 10px;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                }

                .task p {
                    flex: 1;
                    margin: 0;
                    font-size: 16px;
                }

                .task button {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 8px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .task input:checked + p {
                    text-decoration: line-through;
                    color: #888;
                }
            </style>

            <div class="addTasks">
                <input id="newTaskInput" type="text" placeholder="New Task">
                <button id="addTaskButton">Add Task</button>
            </div>
            <div class="tasks">
                ${this.tasks.map((task, index) => `
                    <div class="task">
                        <input type="checkbox" 
                            ${task.completed ? 'checked' : ''} 
                            onchange="document.querySelector('task-list').toggleTask(${index})">
                        <p>${task.text}</p>
                        <button onclick="document.querySelector('task-list').removeTask(${index})">Delete</button>
                    </div>
                `).join('')}
            </div>
        `;
        this.connectedCallback();
    }
}

customElements.define('task-list', TaskList);
