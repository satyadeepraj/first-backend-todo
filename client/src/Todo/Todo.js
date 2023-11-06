import React, { useState,useEffect } from "react";
import axios from "axios";

export default function Todo({ api }) {
  const [textinput, settextInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  
  const handleAdd = async () => {
    const Tasks = await axios.post("http://localhost:8000/form", {
      task: textinput,
    });
    console.log(Tasks);
    settextInput("");
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/delete?id=${taskId}`);
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    
  };
  const handleEdit = (taskId) => {
    const taskToUpdate = api.find((task) => task._id === taskId);
    setUpdateInput(taskToUpdate.task);
    setSelectedTaskId(taskId);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/update?id=${selectedTaskId}`, {
        task: updateInput,
      });
      setUpdateInput("");
      setSelectedTaskId(null);
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (api) {
    return (
      <div>
        <h1>Todo-App-By Satya</h1>
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
            {api.map((task) => (
              <li key={task._id}>
                {selectedTaskId === task._id ? (
                <div>
                  <input
                    value={updateInput}
                    onChange={(e) => setUpdateInput(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Update</button>
                </div>
              ) : (
                <div>
                  {task.task}
                  <button onClick={() => handleEdit(task._id)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
