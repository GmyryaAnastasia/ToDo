import React, {useCallback, useEffect} from 'react';
import {
    changeFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    fetchTodolists,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../state/state";
import {FilterValuesType, TasksStateType} from "../../app/App";
import {TaskStatuses} from "../../api/todolist-api";
import {createTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";


export const TodolistsList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector<boolean>(state => state.auth.isLogin)

    useEffect(() => {
        if (!isLogin) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [])

    const changeStatusTask = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [])

    const changeFilterStatus = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }, [])

    const changeTitleTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [])
    const removeTasks = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])

    if (!isLogin) {
        debugger
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5}>
            {todolists?.map(tl => {
                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            tasks={tasks[tl.id]}
                            removeTasks={removeTasks}
                            changeFilterStatus={changeFilterStatus}
                            addTask={addTask}
                            changeStatusTask={changeStatusTask}
                            removeTodolist={removeTodolist}
                            changeTitleTask={changeTitleTask}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            })
            }
        </Grid>

    </>
        ;
}


