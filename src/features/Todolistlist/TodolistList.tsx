import React, {useCallback, useEffect} from 'react';
import {todolistsAction, todolistsThunks} from "features/Todolistlist/todolists.reducer";
import {useAppSelector} from "app/store";
import {FilterValuesType} from "app/App";
import {tasksThunks} from "features/Todolistlist/tasks.reducer";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selectors";
import {selectTodolists} from "features/Todolistlist/todolists.selectors";
import {selectTasks} from "features/Todolistlist/tasks.selectors";
import {AddItemForm} from "common/components";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks/useActions";


export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const {
        createTodolist,
        removeTodolist: removeTodolistThunk,
        fetchTodolists,
        changeTodolistTitle: changeTodolistTitleThunk
    } = useActions(todolistsThunks)
    const {updateTask, createTask, removeTask} = useActions(tasksThunks)
    const {changeFilter} = useActions(todolistsAction)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])

    const addTodolist = useCallback((title: string) => {
        createTodolist(title);
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        changeTodolistTitleThunk({todolistId, title})
    }, [])

    const changeStatusTask = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        updateTask({todolistId, taskId, domainModel: {status}})
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        createTask({todolistId, title})
    }, [])

    const changeFilterStatus = useCallback((todolistId: string, filter: FilterValuesType) => {
        changeFilter({todolistId, filter})
    }, [])

    const changeTitleTask = useCallback((todolistId: string, taskId: string, title: string) => {
        updateTask({todolistId, taskId, domainModel: {title}})
    }, [])
    const removeTasks = useCallback((todolistId: string, taskId: string) => {
        removeTask({todolistId, taskId})
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        removeTodolistThunk(todolistId)
    }, [])

    if (!isLoggedIn) {
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


