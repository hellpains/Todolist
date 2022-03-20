import React, {FC, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Input} from "./Input";
import {Button} from "./Button";
import {TasksLIst} from "./TasksLIst";
import {FilterButton} from "./FilterButton";
import {v1} from "uuid";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

export const Todolist: FC<TodolistType> = ({title, tasks, changeFilter, removeTask, addTask}) => {
    let [task, setTask] = useState('')

    const onClickAddTask = () => {
        addTask(task)
        setTask("")
    }

    return (
        <div>
            <TodolistHeader title={title}/>
            <div>
                <Input task={task} setTask={setTask} addTask={addTask}/>
                <Button name={'+'} callback={onClickAddTask}/>
            </div>
            <TasksLIst tasks={tasks} removeTask={removeTask}/>
            <FilterButton changeFilter={changeFilter}/>
        </div>
    );
};


