import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import "../App.css";

const TodoItem = ({ todo, onDelete }) => {
  const { setTodos } = useContext(TodoContext);

  const handleDelete = () => {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((item) => item.id !== todo.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <li className="todo-item">
      {todo.title}
      <button onClick={handleDelete}>Удалить</button>
    </li>
  );
};

export default TodoItem;
