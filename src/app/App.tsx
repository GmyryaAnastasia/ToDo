import React, {useEffect} from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../state/state";
import {DomainType} from "../api/todolist-api";
import LinearProgress from '@mui/material/LinearProgress';
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../features/Todolistlist/TodolistList";
import {Login} from "../features/Login/Login";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "../features/Login/auth-reducer";

export type FilterValuesType = 'All' | 'Active' | 'Completed'


export type TasksStateType = {
    [key: string]: DomainType[]
}

function App() {

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <AppBar position="static">
                <CustomizedSnackbars/>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Menu
                        <Button color='inherit' onClick={onClickHandler}>Log out</Button>
                    </Typography>

                </Toolbar>
                {status === 'loading' ? <LinearProgress color="secondary"/> : ''}
            </AppBar>


            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404:Page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;
