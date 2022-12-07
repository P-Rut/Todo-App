const input = document.querySelector(".input-todo");
const button = document.querySelector(".add-todo-btn");
const naszeTodosyContainer = document.querySelector(".nasze-todosy-container");

button.addEventListener("click", async () => {
  const title = input.value;

  const response = await fetch("http://localhost:7777/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const receivedTodo = await response.json();

  const todoContainer = document.createElement("div");
  const titleText = document.createElement("p");
  const completed = document.createElement("p");

  todoContainer.classList.add("todo");
  titleText.innerText = receivedTodo.title;
  completed.innerText = receivedTodo.completed;

  todoContainer.append(...[titleText, completed]);

  naszeTodosyContainer.append(todoContainer); // append dodaje tego todosa wpisanego do listy
  input.value = "";
});

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:7777");
    const todos = await response.json();

    todos.map((todo) => {
      const todoContainer = document.createElement("div");
      const title = document.createElement("p");
      const completed = document.createElement("p");

      todoContainer.classList.add("todo");
      title.innerText = todo.title;
      completed.innerText = todo.completed;

      // todoContainer.append(title)
      // todoContainer.append(completed)

      todoContainer.append(...[title, completed]);
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
