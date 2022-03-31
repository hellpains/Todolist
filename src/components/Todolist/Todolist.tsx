import React, {FC, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {Input} from "../Input/Input";
import {Button} from "../UniversalButton/Button";
import {TasksLIst} from "../TasksLIst/TasksLIst";
import {FilterButton} from "../FilterButton/FilterButton";
import {TodolistTitle} from "./TodolistTitle";

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
}

export const Todolist: FC<TodolistType> = (
    {
        title, tasks, removeTodolist,
        changeFilter, removeTask,
        addTask, changeStatus,
        filter, todolistId,
    }
) => {
    let [task, setTask] = useState('')
    let [error, setError] = useState('')

    const onClickAddTask = () => {
        if (task.trim() !== "") {
            addTask(todolistId, task.trim())
            setTask("")
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TodolistTitle
                todolistId={todolistId}
                removeTodolist={removeTodolist}
                title={title}
            />
            <Input
                onClickAddTask={onClickAddTask}
                setError={setError}
                error={error}
                task={task}
                setTask={setTask}
            />
            <Button
                name={'+'}
                callback={onClickAddTask}
            />
            {error && <div className={'error-message'}>{error}</div>}
            <TasksLIst
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