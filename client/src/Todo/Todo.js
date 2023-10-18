import React, { useState } from "react";
import axios from "axios";

export default function Todo({ api }) {
  const [textinput, settextInput] = useState("");
  const [todo, setTodo] = useState([]);

  const handleAdd = async () => {
    const Tasks = await axios.post("http://localhost:8000/form", {
      task: textinput,
    });
    console.log(Tasks);
    settextInput("");
  };
  const handleDelete = (index) => {
    const updatedTodos = [...todo];
    updatedTodos.splice(index, 1);
    setTodo(updatedTodos);
  };
  if (api) {
    return (
      <div>
        <h1>Todo-App</h1>
        <form onSubmit={handleAdd}>
          <div>
            <input
              value={textinput}
              onChange={(e) => settextInput(e.target.value)}
            />
            <button type="submit">Add-Todo</button>
          </div>
        </form>
        <div>
          <h1>Tasks :-</h1>
          <ul>
            {api.map((task, index) => (
              <li key={index}>
                {task.task}

                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
