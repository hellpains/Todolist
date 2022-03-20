import React, {FC} from 'react';
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
}

export const Todolist: FC<TodolistType> = ({title, tasks, changeFilter, removeTask}) => {
    return (
        <div>
            <TodolistHeader title={title}/>
            <div>
                <Input/>
                <Button name={'+'}/>
            </div>
            <TasksLIst tasks={tasks} removeTask={removeTask}/>
            <FilterButton changeFilter={changeFilter}/>
        </div>
    );
};


