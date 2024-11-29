import React, { ChangeEvent, FC, useRef, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import TodoTask from "./Components/TodoTask";
// import "./index.css"; // Import Tailwind CSS


// ------------ Prime React -------------
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme for PrimeReact
import "primereact/resources/primereact.min.css"; // Core CSS for PrimeReact
import "primeicons/primeicons.css"; // Icons

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  // Ref for Toast notifications
  const toast = useRef<Toast>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    if (!task || deadline <= 0) {
      // Show error toast if inputs are invalid
      toast.current?.show({
        severity: "error",
        summary: "Invalid Input",
        detail: "Please provide a valid task and deadline.",
        life: 3000,
      });
      return;
    }

    const newTask = {
      taskName: task,
      deadLine: deadline,
    };

    setTodoList([...todoList, newTask]);

    // Show success toast
    toast.current?.show({
      severity: "success",
      summary: "Task Added",
      detail: `Task "${task}" with a deadline of ${deadline} days was added.`,
      life: 3000,
    });

    setTask(""); // Clear task input
    setDeadline(0); // Clear deadline input
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );

    // Show success toast for task deletion
    toast.current?.show({
      severity: "info",
      summary: "Task Completed",
      detail: `Task "${taskNameToDelete}" was removed from the list.`,
      life: 3000,
    });
  };

  return (
    <div className="App">
      {/* Toast Component */}
      <Toast ref={toast} />

      <div>
        <h2 className="text-blue-600">To-Do List</h2>
      </div>

      <div className="header">
        <div className="inputContainer">
          <InputText
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline || ""}
            onChange={handleChange}
          />
        </div>
        
        <Button severity="success" onClick={addTask}>
          Add Task
        </Button>

      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
