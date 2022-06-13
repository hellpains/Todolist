import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reducer";
import {AppRootStateType} from "./store";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const App = () => {
    const status =useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="secondary"/>}
                </AppBar>
            </Box>

            <Container fixed>
                <TodolistsList/>
            </Container>

            <ErrorSnackbar/>
        </div>
    );
}



