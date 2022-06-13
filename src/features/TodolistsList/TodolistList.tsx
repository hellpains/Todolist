import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    changeTodolistFilterAC, changeTodolistTitleTC, addTodolistTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";

export const TodolistsList: React.FC = () => {
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
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {

        dispatch(updateTaskTC(todolistId, taskId, {status}))
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
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {
                    todolists.map(tl => {
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
        </>
    )
};