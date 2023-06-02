import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";


export type FiltersType = 'All' | 'Active' | 'Completed'

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])

    const changeStatusTask = useCallback((todolistId: string, taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])

    const changeFilterStatus = useCallback((todolistId: string, filter: FiltersType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }, [])

    const changeTitleTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTitleTaskAC(todolistId, taskId, title))
    }, [])
    const removeTasks = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
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
            </Container>
        </div>
    );
}

export default App;
