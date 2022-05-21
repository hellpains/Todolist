import React, {useReducer} from 'react';
import '../../App.css';
import {v1} from "uuid";
import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../UniversalButton/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../../state/todolistReducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "../../state/tasksReducer/tasks-reducer";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

export const AppWithReducers = () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Mild', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasksReducer(addTaskAC(todolistId, title))
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasksReducer(updateTaskTitleAC(todolistId, taskId, title))
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }
    const addTodolistHandler = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const updateTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, title))
    }

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
                    <AddItemForm addItem={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map(tl => {
                            let filteredTask = tasks[tl.id]
                            if (tl.filter === 'active') {
                                filteredTask = filteredTask.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                filteredTask = filteredTask.filter(t => t.isDone === true)
                            }

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
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}

