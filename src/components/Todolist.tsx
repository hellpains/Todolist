import React, {FC} from 'react';
import {FilterType, TaskType} from "../App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterType) => void
}

export const Todolist: FC<TodolistType> = ({title, tasks, changeFilter, removeTask}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type=""/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    const onClickButtonHandler = () => removeTask(t.id)

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            {t.title}
                            <button onClick={onClickButtonHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};


