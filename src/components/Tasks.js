import "./css/Tasks.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);

  const [typingTimeout, setTypingTimeout] = useState(null);

  // Load tasks from IndexedDB on component mount
  useEffect(() => {
    const loadTasksFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const tasks = await getAllData(db, "tasks");
        setTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks from IndexedDB:", error);
      }
    };

    loadTasksFromIndexedDB();
  }, []);

  // IndexedDB functions
  async function openDB() {
    const dbName = "tasksDatabase";
    const dbVersion = 1;

    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const getAllData = async (db, storeName) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  // Periodically update tasks in IndexedDB
  /*useEffect(() => {
    const intervalId = setInterval(() => {
      updateTasksInIndexedDB();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tasks]);*/

  async function updateTasksInIndexedDB(newTasks) {
  try {
    const db = await openDB();
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");

    // Clear existing data
    const clearPromise = new Promise((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    });

    // Wait for the clear operation to complete before adding new tasks
    await clearPromise;

    // Add updated tasks
    await Promise.all(newTasks.map((task) => {
      return new Promise((resolve, reject) => {
        const addRequest = store.add(task);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      });
    }));

    console.log('Added tasks to IndexedDB');
  } catch (error) {
    console.error("Error updating tasks in IndexedDB:", error);
  }
}
  function onInputChange(event) {
    setInput(event.target.value);
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    const newTask = { id: uuidv4(), title: input, completed: false };
    setTasks([...tasks, newTask]); // doesnt update before updateTasksInIndexedDB
    setInput("");
  
    // Update tasks in IndexedDB
    await updateTasksInIndexedDB([newTask,...tasks]);
  }

  //handling changes to specific tasks
  async function handleComplete({ id }) {
    setTasks(
      tasks.map((item) => {
        if (item.id === id)
          return { ...item /*  */, completed: !item.completed };
        return item;
      })
    );
  }
  async function handleDelete({ id }) {
    setTasks(tasks.filter((tasks) => tasks.id !== id));
    updateTasksInIndexedDB();
  }
  async function handleEdit(event, id) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) return { ...task, title: event.target.value };

        return task;
      });
      const intervalId = setInterval(() => {
        updateTasksInIndexedDB();
      }, 1000);
      return () => clearInterval(intervalId);
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
