import { useState } from "react";
import "./taskApp.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const nextTaskId = tasks.length
    ? Math.max(...tasks.map((task) => task.id)) + 1
    : 0;

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="todo-app">
      <NewTaskEntry nextTaskId={nextTaskId} setTasks={setTasks} />
      <div className="task-list">
        {tasks.map((task) => {
          return (
            <Task
              text={task.text}
              deleteTask={() => deleteTask(task.id)}
              key={task.id}
            />
          );
        })}
      </div>
    </div>
  );
}

function NewTaskEntry({ nextTaskId, setTasks }) {
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState(false);

  function createNewTask() {
    if (!taskText) {
      setError(true);
      return;
    }
    setTasks((tasks) => [...tasks, { text: taskText, id: nextTaskId }]);
    setTaskText("");
  }

  return (
    <>
      <textarea
        autoCorrect="true"
        placeholder="Enter task description"
        rows="1"
        spellCheck="true"
        maxLength={100}
        onChange={(e) => {
          setTaskText(e.target.value);
          setError(false);
        }}
        value={taskText}
      />
      <button className="add-task" onClick={createNewTask}>
        Add Task
      </button>
      {error && <p className="error">Please enter a valid task description.</p>}
    </>
  );
}

function Task({ text, deleteTask }) {
  return (
    <div className="task">
      <div>
        <h2>{text}</h2>
      </div>
      <button className="delete-task" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
}
