import React, {useCallback} from 'react';
import {FiltersType, TodolistsType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Tasks} from "./Tasks";


type TodolistType = {
    tasks: TasksType[]
    todolist: TodolistsType
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilterStatus: (todolistId: string, value: FiltersType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatusTask: (todolistId: string, taskId: string, filter: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTitleTask: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistType) => {
    const onAllClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolist.id, value)
    const onActiveClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolist.id, value)
    const onCompletedClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolist.id, value)
    const removeTodolistHandler = () => props.removeTodolist(props.todolist.id)
    const addTask = useCallback((title: string) => props.addTask(props.todolist.id, title), [props.addTask, props.todolist.id])
    const changeTodoTitleHandler = useCallback((title: string) => props.changeTodolistTitle(props.todolist.id, title), [])

    let tasks = props.tasks
    if (props.todolist.filter === 'Active') {
        tasks = tasks.filter(f => !f.isDone)
    }
    if (props.todolist.filter === 'Completed') {
        tasks = tasks.filter(f => f.isDone)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodoTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}><DeleteIcon/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {tasks.map(t => <Tasks task={t}
                               key={t.id}
                               todolistId={props.todolist.id}
                               changeStatusTask={props.changeStatusTask}
                               removeTasks={props.removeTasks}
                               changeTitleTask={props.changeTitleTask}/>
        )}
        <div>
            <Button onClick={() => {
                onAllClickHandler('All')
            }} color="secondary" variant={props.todolist.filter === 'All' ? "outlined" : 'text'}>All
            </Button>
            <Button onClick={() => {
                onActiveClickHandler('Active')
            }} color="secondary" variant={props.todolist.filter === 'Active' ? "outlined" : 'text'}>Active
            </Button>
            <Button onClick={() => {
                onCompletedClickHandler('Completed')
            }} color="secondary" variant={props.todolist.filter === 'Completed' ? "outlined" : 'text'}>Completed
            </Button>
        </div>
    </div>

});


