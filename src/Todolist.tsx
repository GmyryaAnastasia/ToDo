import React, {ChangeEvent, useState} from 'react';
import {FiltersType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


type TodolistType = {
    title: string
    task: TasksType[]
    todolistId: string
    filter: string
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

const Todolist = (props: TodolistType) => {

    const onAllClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolistId, value)
    const onActiveClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolistId, value)
    const onCompletedClickHandler = (value: FiltersType) => props.changeFilterStatus(props.todolistId, value)
    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)
    const addTaskHandler = (title: string) => props.addTask(props.todolistId, title)
    const changeTodoTitleHandler = (title: string) => props.changeTodolistTitle(props.todolistId, title)

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodoTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}><DeleteIcon/></IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>

        {props.task.map((t => {

                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatusTask(props.todolistId, t.id, e.currentTarget.checked)
                }
                const removeTaskHandler = () => {
                    props.removeTasks(props.todolistId, t.id)
                }

                const onChangeTitleTask = (title: string) => {
                    props.changeTitleTask(props.todolistId, t.id, title)
                }
                return <div key={t.id}
                            className={t.isDone ? 'is-done' : ''}><Checkbox color="success"
                                                                            checked={t.isDone}
                                                                            onChange={changeStatusHandler}

                />
                    <EditableSpan value={t.title} onChange={onChangeTitleTask}/>
                    <IconButton onClick={removeTaskHandler}><DeleteIcon/></IconButton>
                </div>
            }
        ))}
        <div>
            <Button onClick={() => {
                onAllClickHandler('All')
            }} color="secondary" variant={props.filter === 'All' ? "outlined" : 'text'}>All
            </Button>
            <Button onClick={() => {
                onActiveClickHandler('Active')
            }} color="secondary" variant={props.filter === 'Active' ? "outlined" : 'text'}>Active
            </Button>
            <Button onClick={() => {
                onCompletedClickHandler('Completed')
            }} color="secondary" variant={props.filter === 'Completed' ? "outlined" : 'text'}>Completed
            </Button>
        </div>
    </div>

};

export default Todolist;

