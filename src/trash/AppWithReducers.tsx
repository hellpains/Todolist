import React, {useReducer} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    todolistsReducer
} from "../features/TodolistsList/todolists-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";



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
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'},
        {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML/CSS', status: TaskStatuses.Completed,todoListId:todolistId1,
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:'',
                entityStatus:'idle',},
            {id: v1(), title: 'JS', status:TaskStatuses.Completed,todoListId:todolistId1,
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:'',
                entityStatus:'idle',},
            {id: v1(), title: 'React', status:TaskStatuses.New,todoListId:todolistId1,
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:'',
                entityStatus:'idle',},

        ],
        [todolistId2]: [
            {id: v1(), title: 'Mild', status:TaskStatuses.Completed,todoListId:todolistId2,
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:'',
                entityStatus:'idle',},
            {id: v1(), title: 'Book', status:TaskStatuses.New,todoListId:todolistId2,
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:'',
                entityStatus:'idle',},
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasksReducer(addTaskAC({
            todoListId: todolistId,
            title,
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            deadline: '',
            description: '',
            priority: 0,
            startDate: '',
            id: 'id exists',
            entityStatus:'idle',
        }))
    }
    const changeStatus = (todolistId: string, taskId: string, status:TaskStatuses) => {
        dispatchToTasksReducer(updateTaskAC(todolistId, taskId, {status}))
    }
    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasksReducer(updateTaskAC(todolistId, taskId, {title}))
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }
    const addTodolistHandler = (title: string) => {
        const action = addTodolistAC({
            id:v1(),
            title,
            order:0,
            addedDate:''
        })
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
                                filteredTask = filteredTask.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                filteredTask = filteredTask.filter(t => t.status === TaskStatuses.Completed)
                            }

                            return (
                                <Grid key={tl.id} item>
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

