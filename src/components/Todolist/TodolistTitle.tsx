import React, {FC} from 'react';
import {Button} from "../UniversalButton/Button";

type TodolistHeaderType = {
    title: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
}
export const TodolistTitle: FC<TodolistHeaderType> = (
    {
        title, removeTodolist,
        todolistId,
    }
) => {
    const onClickHandler = (todolistId: string) => {
        removeTodolist(todolistId)
    }
    const container = {
        display: 'flex'
    }
    return (
        <div style={container}>
            <h3>{title}</h3><Button name={'x'} callback={() => onClickHandler(todolistId)}/>
        </div>
    );
};