import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FiltersType = 'All' | 'Active' | 'Completed'

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type TaskStateType = {
    [key: string]: TasksType[]
}

function App() {
    // const [tasks, setTask] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false}
    // ])

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const changeStatusTask = (todolistId: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: status} : el)})
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeFilterStatus = (todolistId: string, filter: FiltersType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }


    return (
        <div className="App">
            {todolists.map(tl => {
                let allTodolists = tasks[tl.id]
                let taskForTodolist = allTodolists

                if (tl.filter === 'Active') {
                    taskForTodolist = allTodolists.filter(f => !f.isDone)
                }
                if (tl.filter === 'Completed') {
                    taskForTodolist = allTodolists.filter(f => f.isDone)
                }
                return <Todolist title={tl.title}
                                 todolistId={tl.id}
                                 filter={tl.filter}
                                 task={taskForTodolist}
                                 removeTasks={removeTasks}
                                 changeFilterStatus={changeFilterStatus}
                                 addTask={addTask}
                                 changeStatusTask={changeStatusTask}
                                 removeTodolist={removeTodolist}/>
            })
            }


        </div>


    )
        ;
}

export default App;
