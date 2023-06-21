const input = document.querySelector(".input-todo");
const button = document.querySelector(".add-todo-btn");
const naszeTodosyContainer = document.querySelector(".nasze-todosy-container");
const clearButton = document.querySelector(".clearButton");

const TODO_API_URL = "http://localhost:7777/api/todos";

let todos = [];

const createTodo = (x) => {
  //x to nasz todo ktory dostajemy z serwera lub sami tworzymy

  //tworzymy elementy w pamieci
  const todoContainer = document.createElement("div");
  const titleText = document.createElement("p");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  //dodajemy teraz wartosci ktore juz znamy do elementow
  todoContainer.id = x._id;
  todoContainer.classList.add("todo");
  titleText.innerText = x.text;
  if (x.completed) {
    titleText.classList.add("line");
  }

  // dodanie delete buttona
  deleteButton.innerText = "Delete";
  deleteButton.id = x._id;

  //dodaj button edit ktory pozwoli nam edytowac nazwe todosa
  editButton.innerText = "Edit";
  editButton.id = x._id;

  //dodajemy event listener na completed

  titleText.addEventListener("click", async (e) => {
    const id = x._id;
    try {
      titleText.classList.toggle("line");
      const newTodo = {
        ...x,
        completed: !x.completed,
      };
      const response = await fetch(`${TODO_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTodo }),
      });

      const index = todos.findIndex((todo) => todo._id === id);
      todos.splice(index, 1, newTodo);
    } catch (error) {
      console.log(error);
    }
  });

  //dodajemy event listener do clear buttona

  clearButton.addEventListener("click", async (e) => {
    await fetch(`${TODO_API_URL}/deleteCompleted`, {
      method: "DELETE",
    });

    const completedTodos = document.querySelectorAll(".todo");
    const idsToDelete = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo._id);

    completedTodos.forEach((todo) =>
      idsToDelete.forEach((id) => {
        if (id === todo.id) {
          todo.remove();
        }
      })
    );
  });

  //dodajemy event listener do delete buttona

  deleteButton.addEventListener("click", async (d) => {
    const id = d.target.id;

    await fetch(`${TODO_API_URL}/${id}`, {
      method: "DELETE",
    });

    todos = todos.filter((todo) => todo._id !== id);

    todoContainer.remove();
  });

  //dodaj

  // dodaje event listener do edit buttona
  editButton.addEventListener("click", async (e) => {
    const id = e.target.id;
    if (editButton.innerText.toLowerCase() == "edit") {
      titleText.contentEditable = true;
      titleText.focus();
      editButton.innerText = "Save";
    } else {
      titleText.contentEditable = false;
      editButton.innerText = "Edit";
      const todo = todos.filter((todo) => todo._id === id)[0];
      const newTodo = {
        ...todo,
        text: titleText.textContent,
      };
      await fetch(`${TODO_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTodo }),
      });
    }

    // const receivedTodo = await response.json();
    // todoText.innerText = receivedTodo.text;
  });

  return {
    todoContainer,
    titleText,
    //completed,
    editButton,
    deleteButton,
  };
};

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const text = input.value;

  const response = await fetch(`${TODO_API_URL}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const receivedTodo = await response.json();

  todos.push(receivedTodo);

  const { todoContainer, titleText, editButton, deleteButton } =
    createTodo(receivedTodo);

  todoContainer.append(...[titleText, editButton, deleteButton]);

  naszeTodosyContainer.append(todoContainer);
  input.value = "";
});

const fetchData = async () => {
  try {
    const response = await fetch(TODO_API_URL);
    const receivedTodos = await response.json();

    todos = receivedTodos;

    receivedTodos.map((todo) => {
      const { todoContainer, titleText, editButton, deleteButton } =
        createTodo(todo);

      todoContainer.append(...[titleText, editButton, deleteButton]);
      naszeTodosyContainer.append(todoContainer);
    });
  } catch (err) {
    console.log(err);
  }
};

fetchData();

// fetch("http://localhost:44445") // inny sposób na fetchowanie
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
