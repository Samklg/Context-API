import React from "react";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </header>
    </div>
  );
}

export default App;
