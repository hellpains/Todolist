import React, {FC, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Input} from "./Input";
import {Button} from "./Button";
import {TasksLIst} from "./TasksLIst";
import {FilterButton} from "./FilterButton";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

export const Todolist: FC<TodolistType> = (
    {
        title,
        tasks,
        changeFilter,
        removeTask,
        addTask,
        changeStatus,
        filter,
    }
) => {
    let [task, setTask] = useState('')
    let [error, setError] = useState('')

    const onClickAddTask = () => {
        if (task.trim() !== "") {
            addTask(task.trim())
            setTask("")
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TodolistHeader title={title}/>
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
                changeStatus={changeStatus}
                tasks={tasks}
                removeTask={removeTask}
            />
            <FilterButton
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    );
};


