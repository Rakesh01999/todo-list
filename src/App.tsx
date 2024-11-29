import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import TodoTask from "./Components/TodoTask";

// ------------ Prime React -------------
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme for PrimeReact
import 'primereact/resources/primereact.min.css'; // Core CSS for PrimeReact
import 'primeicons/primeicons.css'; // Icons


import { Button } from 'primereact/button';
        


const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadLine: deadline,
    };
    setTodoList([...todoList, newTask]);
    // console.log(todoList);

    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">

      <div>
        <h2>To-Do</h2>
      </div>

      <div className="header">
        <div className="inputContainer">
          <input
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
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <Button severity="success" onClick={addTask}>Add Task</Button>
        
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
