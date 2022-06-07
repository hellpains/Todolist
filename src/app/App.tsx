import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}



export const App = () => {
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
                </AppBar>
            </Box>
            <Container fixed>
                <TodolistsList/>
            </Container>


        </div>
    );
}



