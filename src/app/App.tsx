import React, {useEffect} from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container} from "@mui/material";
import {useAppSelector} from "app/store";
import LinearProgress from '@mui/material/LinearProgress';
import {CustomizedSnackbars} from 'common/components/ErrorSnackbar/ErrorSnackBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodolistsList} from 'features/Todolistlist/TodolistList';
import {Auth} from 'features/auth/Auth';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {selectIsInitialized, selectStatus} from "app/app.selectors";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {DomainType} from "features/Todolistlist/todolists.api";
import {authThunk} from "features/auth/auth.reducer";
import {bindActionCreators} from "redux";
import {useActions} from "common/hooks/useActions";

export type FilterValuesType = 'All' | 'Active' | 'Completed'


export type TasksStateType = {
    [key: string]: DomainType[]
}

function App() {

    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const {initializeApp, logout} = useActions(authThunk)


    useEffect(() => {
        initializeApp()
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const logoutHandler = () =>logout()


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
                        <Button color='inherit' onClick={logoutHandler}>Log out</Button>
                    </Typography>

                </Toolbar>
                {status === 'loading' ? <LinearProgress color="secondary"/> : ''}
            </AppBar>


            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Auth/>}/>
                    <Route path={'/404'} element={<h1>404:Page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;
