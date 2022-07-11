import React, {FC, useCallback, useEffect,} from 'react';
import {TasksList} from "./TasksLIst/TasksList";
import {FilterButton} from "../../../components/FilterButton/FilterButton";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import { FilterType, TodolistDomainType} from "../todolists-reducer";
import {useAppDispatch} from "../../../app/store";
import {fetchTasksTC} from "../tasks-reducer";

type TodolistType = {
    todolist:TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist: FC<TodolistType> = React.memo((
    {
        todolist,
        tasks, changeFilter,
        removeTask, addTask,
        changeStatus,
        removeTodolist, updateTaskTitle,
        updateTodolistTitle, demo = false
    }
) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(todolist.id))

    }, [])

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolist.id, title)
    }, [addTask, todolist.id])

    let filteredTask = tasks
    if (todolist.filter === 'active') {
        filteredTask = filteredTask.filter(t => t.status === TaskStatuses.New)
    }
    if( todolist.filter === 'completed') {
        filteredTask = filteredTask.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <TodolistTitle
                todolist={todolist}
                updateTodolistTitle={updateTodolistTitle}
                removeTodolist={removeTodolist}
            />
            <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus==="loading"}/>
            <TasksList
                updateTaskTitle={updateTaskTitle}
                todolistId={todolist.id}
                changeStatus={changeStatus}
                tasks={filteredTask}
                removeTask={removeTask}
            />
            <FilterButton
                disabled={todolist.entityStatus==="loading"}
                todolistId={todolist.id}
                filter={todolist.filter}
                changeFilter={changeFilter}
            />
        </div>
    );
})




















