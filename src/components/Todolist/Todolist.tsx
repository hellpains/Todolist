import React, {FC, useCallback, useState} from 'react';
import {FilterType, TaskType} from "../App/App";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {Input} from "../Input/Input";
import {MyButton} from "../UniversalButton/MyButton";
import {TasksList} from "../TasksLIst/TasksList";
import {FilterButton} from "../FilterButton/FilterButton";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "../UniversalButton/AddItemForm/AddItemForm";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: FC<TodolistType> = React.memo((
    {
        title, todolistId,
        tasks, changeFilter,
        removeTask, addTask,
        changeStatus, filter,
        removeTodolist, updateTaskTitle,
        updateTodolistTitle
    }
) => {
    console.log('Todolist')

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask,todolistId])

    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = filteredTask.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTask = filteredTask.filter(t => t.isDone === true)
    }

    return (
        <div>
            <TodolistTitle
                updateTodolistTitle={updateTodolistTitle}
                title={title}
                removeTodolist={removeTodolist}
                todolistId={todolistId}
            />
            <AddItemForm addItem={addTaskHandler}/>
            <TasksList
                updateTaskTitle={updateTaskTitle}
                todolistId={todolistId}
                changeStatus={changeStatus}
                tasks={filteredTask}
                removeTask={removeTask}
            />
            <FilterButton
                todolistId={todolistId}
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    );
})




















