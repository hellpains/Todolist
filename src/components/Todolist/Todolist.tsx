import React, {FC, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {Input} from "../Input/Input";
import {MyButton} from "../UniversalButton/MyButton";
import {TasksLIst} from "../TasksLIst/TasksLIst";
import {FilterButton} from "../FilterButton/FilterButton";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "../UniversalButton/AddItemForm";

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

export const Todolist: FC<TodolistType> = (
    {
        title, todolistId,
        tasks, changeFilter,
        removeTask, addTask,
        changeStatus, filter,
        removeTodolist, updateTaskTitle,
        updateTodolistTitle
    }
) => {
    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
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
            <TasksLIst
                updateTaskTitle={updateTaskTitle}
                todolistId={todolistId}
                changeStatus={changeStatus}
                tasks={tasks}
                removeTask={removeTask}
            />
            <FilterButton
                todolistId={todolistId}
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    );
};




















