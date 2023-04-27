import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {Simulate} from "react-dom/test-utils";
import {v1} from "uuid";

export type FiltersType = 'All' | 'Active' | 'Completed'

function App() {
    const [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState('All')

    let taskForTodolist = tasks

    if (filter === 'Active') {
        taskForTodolist = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        taskForTodolist = tasks.filter(f => f.isDone)
    }

    const changeStatusTask = (taskId: string, status: boolean) => {
        setTask(tasks.map(el => el.id === taskId ? {...el, isDone: status} : el))
    }

    const addTask = (title: string) => {
        setTask([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    const changeFilterStatus = (value: FiltersType) => {
        setFilter(value)
    }

    const removeTodolist = (taskId: string) => {
        setTask(tasks.filter(f => f.id != taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to Learn'}
                      task={taskForTodolist}
                      removeTodolist={removeTodolist}
                      changeFilterStatus={changeFilterStatus}
                      addTask={addTask}
                      changeStatusTask={changeStatusTask}/>

        </div>
    );
}

export default App;
