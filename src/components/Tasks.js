import "./css/Tasks.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    setTasks([...tasks, { id: uuidv4(), title: input, completed: false }]);
    setInput("");
  }

  //handling changes to specific tasks
  function handleComplete({ id }) {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) return { ...item, completed: !item.completed };
        console.log("item", item);
        return item;
      })
    );
  }
  function handleDelete({ id }) {
    setTasks(tasks.filter((tasks) => tasks.id !== id));
  }
  function handleEdit(event,id) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) return { ...task, title: event.target.value };
        
        return task;
      });
    });
  }

  return (
    <div className="tasks">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Enter Task..."
          className="task-input"
          value={input}
          required
          onChange={onInputChange}
        />
        <button className="button-add" type="submit">
          Add
        </button>
      </form>
      <div>
        {tasks.map((tasks) => (
          <li className="task-list" key={tasks.id}>
            <input
              type="text"
              value={tasks.title}
              className="task"
              onChange={(event) => handleEdit(event, tasks.id)}
            />
            <button
              className="button-complete"
              onClick={() => {
                handleComplete(tasks);
              }}
            >
              {tasks.completed ? "0" : "1"}
            </button>

            <button
              className="button-delete"
              onClick={() => {
                handleDelete(tasks);
              }}
            >
              x
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
