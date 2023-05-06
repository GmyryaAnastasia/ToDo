import React, {useState} from 'react';
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

    let [tasks, setTasks] = useState<TasksStateType>({
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
    const addTodolist = (title: string) => {
        let NewTodolistId = v1()
        setTodolists([{id: NewTodolistId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [NewTodolistId]: []})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
    }

    const changeStatusTask = (todolistId: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: status} : el)})
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeFilterStatus = (todolistId: string, filter: FiltersType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const changeTitleTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)})
    }

    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
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
                <Grid container  style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {
                        let allTodolists = tasks[tl.id]
                        let taskForTodolist = allTodolists

                        if (tl.filter === 'Active') {
                            taskForTodolist = allTodolists.filter(f => !f.isDone)
                        }
                        if (tl.filter === 'Completed') {
                            taskForTodolist = allTodolists.filter(f => f.isDone)
                        }
                        return<Grid item>
                            <Paper style={{padding:'10px'}}>
                                <Todolist title={tl.title}
                                          todolistId={tl.id}
                                          filter={tl.filter}
                                          task={taskForTodolist}
                                          removeTasks={removeTasks}
                                          changeFilterStatus={changeFilterStatus}
                                          addTask={addTask}
                                          changeStatusTask={changeStatusTask}
                                          removeTodolist={removeTodolist}
                                          changeTitleTask={changeTitleTask}
                                          changeTodolistTitle={changeTodolistTitle}/>
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
