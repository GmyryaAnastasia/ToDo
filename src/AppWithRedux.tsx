import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container, Grid, Paper} from "@mui/material";
import {changeFilterAC, changeTodolistTitleAC, todolistsReducer, addTodolistAC} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskAC,
    removeTaskAC, removeTodolistAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";
import TodolistWithRedux from "./TodolistWithRedux";

export type FiltersType = 'All' | 'Active' | 'Completed'

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {
    // const [tasks, setTask] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false}
    // ])
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // let todolistID1 = v1()
    // let todolistID2 = v1()
    //
    // let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,
    //     [
    //         {id: todolistID1, title: 'What to learn', filter: 'all'},
    //         {id: todolistID2, title: 'What to buy', filter: 'all'},
    //     ]
    // )
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ]
    // })
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }


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
                    {
                        todolists.map(tl => {

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistWithRedux
                                        todolist={tl}
                                        // title={tl.title}
                                        //       todolistId={tl.id}
                                        //       filter={tl.filter}
                                        //       task={taskForTodolist}
                                        //       removeTasks={removeTasks}
                                        //       changeFilterStatus={changeFilterStatus}
                                        //       addTask={addTask}
                                        //       changeStatusTask={changeStatusTask}
                                        //       removeTodolist={removeTodolist}
                                        //       changeTitleTask={changeTitleTask}
                                        //       changeTodolistTitle={changeTodolistTitle}
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

export default AppWithRedux;
