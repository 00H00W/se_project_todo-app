class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._template = document.querySelector(templateSelector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  getView() {
    this._todoElement = this._template.content
      .querySelector(".todo")
      .cloneNode(true);

    this._generateName()
      ._generateCheckbox()
      ._generateDate()
      ._setEventListeners();

    return this._todoElement;
  }

  // Attach event listeners to elements
  _setEventListeners() {
    // Delete Button
    this._todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._handleDelete(this._data.completed);
        this._todoElement.remove();
      });
    // Check Box
    this._todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", () => {
        this._data.completed = !this._data.completed;
        this._handleCheck(this._data.completed);
      });
    return this;
  }

  // Fill out the main name
  _generateName() {
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;
    return this;
  }

  // Set checkbox status and label id binding
  _generateCheckbox() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    todoCheckboxEl.checked = this._data.completed;
    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
    return this;
  }

  // Generate the date in string format
  _generateDate() {
    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    return this;
  }
}

export default Todo;
