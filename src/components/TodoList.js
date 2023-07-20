import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import "../App.css";

const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem = { title: newTodo };
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleSearch = () => {
    fetch(`http://localhost:3001/todos?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error searching todos:", error);
      });
  };

  const handleSortChange = () => {
    setSort(!sort);
  };

  const sortedTodos = sort
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        className="todo-input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Введите новое дело"
      />
      <button onClick={handleAddTodo}>Добавить</button>

      <div>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск дела"
        />
        <button className="search-button" onClick={handleSearch}>
          Поиск
        </button>
      </div>

      <div>
        <label>
          Сортировать по алфавиту:
          <input
            className="sort-checkbox"
            type="checkbox"
            checked={sort}
            onChange={handleSortChange}
          />
        </label>
      </div>

      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
