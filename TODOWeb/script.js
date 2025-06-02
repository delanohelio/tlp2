const todos = [
    { id: 0, title: "Estudar JavaScript", done: true},
    { id: 1, title: "Fazer exercícios de HTML e CSS", done: false },
    { id: 2, title: "Ler um artigo sobre APIs", done: false },
    { id: 3, title: "Refatorar projeto anterior", done: true },
    { id: 4, title: "Enviar tarefa no Moodle", done: false },
];

function renderTODOS(todos) {
    const todoListDOM = document.getElementById("todo-list");
    todoListDOM.innerHTML = "";

    for (const todo of todos) {
        const itemDOM = document.createElement("li");
        itemDOM.textContent = todo.title;

        if(todo.done) {
            itemDOM.className = "done";
        } else {
            itemDOM.className = "";
        }

        todoListDOM.appendChild(itemDOM);

        const checkboxDOM = document.createElement("input");
        checkboxDOM.type = "checkbox";
        checkboxDOM.className = "checkbox";
        checkboxDOM.checked = todo.done;
        checkboxDOM.addEventListener("change", changedCheckBox);
        itemDOM.appendChild(checkboxDOM);
    }
}

function changedCheckBox(event) {
    const itemDOM = event.target.parentElement;
    if (event.target.checked) {
        itemDOM.className = "done";
    } else {
        itemDOM.className = "";
    }
}


function filterTODOS(event) {
    const filterInputDOM = event.target;
    const filterValue = filterInputDOM.value;

    const filteredTodos = [];

    for (todo of todos) {
        if(todo.title.toLowerCase().includes(filterValue.toLowerCase())) {
            filteredTodos.push(todo)
        }
    }

    renderTODOS(filteredTodos);

}

renderTODOS(todos)

const filterElementDOM = document.getElementById("filter");
filterElementDOM.addEventListener("input", filterTODOS);