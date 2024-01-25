import "./css/Tasks.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IndexDBHandler } from "./DB";

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);


  // Load tasks from IndexedDB on component mount
  useEffect(() => {
    const loadTasksFromIndexedDB = async () => {
      try {
        const db = await IndexDBHandler.openDB();
        const tasks = await IndexDBHandler.getAllData(db, "tasks");
        setTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks from IndexedDB:", error);
      }
    };

    loadTasksFromIndexedDB();
  }, []);

  function onInputChange(event) {
    setInput(event.target.value);
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    console.log(tasks)
    const newTask = { id: uuidv4(), title: input, completed: false, timestamp: new Date().getTime() };
    setTasks([newTask, ...tasks]); // doesnt update before updateTasksInIndexedDB
    setInput("");

    // Update tasks in IndexedDB

    IndexDBHandler.updateInIndexedDB([newTask, ...tasks], 'tasks');
  }

  //handling changes to specific tasks
  async function handleComplete({ id }) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) return { ...item /*  */, completed: !item.completed };
      return item;
    });
    setTasks(updatedTasks);
    IndexDBHandler.updateInIndexedDB(updatedTasks, 'tasks');
  }
  async function handleDelete({ id }) {
    const updatedTasks = tasks.filter((tasks) => tasks.id !== id);
    setTasks(updatedTasks);
    IndexDBHandler.updateInIndexedDB(updatedTasks, 'tasks');
  }

  async function handleEdit(event, id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, title: event.target.value };

      return task;
    });
    setTasks(updatedTasks);

    const intervalId = setInterval(() => {
      IndexDBHandler.updateInIndexedDB(updatedTasks, 'tasks');
    }, 1000);

    // Clear the interval after 1 second
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
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
