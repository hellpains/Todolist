import React, {useCallback, useEffect} from 'react';
import '../../../App.css';
import {Todolist} from "../../Todolist/Todolist";
import {AddItemForm} from "../../UniversalButton/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC,
    TodolistDomainType,
} from "../../../state/todolistReducer/todolists-reducer";
import {createTaskTC, deleteTaskTC, updateTaskTC,} from "../../../state/tasksReducer/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../state/store";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

export const AppWithRedux = () => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {

        dispatch(updateTaskTC(todolistId,taskId,{status}))
    }, [dispatch])

    const updateTaskTitle = useCallback((todolistId: string, title: string, taskId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


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
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        let filteredTask = tasks[tl.id]
                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        updateTodolistTitle={updateTodolistTitle}
                                        updateTaskTitle={updateTaskTitle}
                                        removeTodolist={removeTodolist}
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={filteredTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>


        </div>
    );
}

