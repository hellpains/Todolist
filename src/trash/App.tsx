import React, {useState} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {TaskPriorities, TaskStatuses, TaskType,} from "../api/todolists-api";
import {FilterType, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

export function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(), title: 'HTML/CSS', status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus:'idle',
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus:'idle',
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus: 'idle',
            },

        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Mild', status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus:'idle',
            },
            {
                id: v1(), title: 'Book', status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus:'idle',
            },
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(), title, status: TaskStatuses.New, todoListId: todolistId,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
            entityStatus:'idle'
        }
        // @ts-ignore
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeStatus = (todolistId: string, id: string, status: TaskStatuses) => {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, status} : t)
            })
    }

    const updateTaskTitle = (todolistId: string, title: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }


    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const addTodolistHandler = (title: string) => {
        let newId = v1()
        setTodolists([{id: newId, title, filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}, ...todolists])
        setTasks({...tasks, [newId]: []})
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
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
                                filteredTask = filteredTask.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                filteredTask = filteredTask.filter(t => t.status === TaskStatuses.Completed)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            todolist={tl}
                                            updateTodolistTitle={updateTodolistTitle}
                                            updateTaskTitle={updateTaskTitle}
                                            removeTodolist={removeTodolist}
                                            key={tl.id}
                                            tasks={filteredTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
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
