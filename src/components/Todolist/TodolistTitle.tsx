import React, {FC} from 'react';
import {Button} from "../UniversalButton/Button";
import {EditableSpan} from "../UniversalButton/EditableSpan";

type TodolistHeaderType = {
    title: string
    removeTodolist: (todolistId: string) => void
    todolistId: string
    updateTodolistTitle:(todolistId:string,title:string)=>void
}
export const TodolistTitle: FC<TodolistHeaderType> = (
    {
        title, removeTodolist,
        todolistId,updateTodolistTitle
    }
) => {
    const onClickHandler = (todolistId: string) => {
        removeTodolist(todolistId)
    }
    const flex = {
        display: 'flex'
    }
    const updateTodolistTitleHandler = (newTitle:string) => {
        updateTodolistTitle(todolistId,newTitle)
    }
    return (
        <div style={flex}>
            <h3><EditableSpan title={title} onChange={(title:string)=>updateTodolistTitleHandler(title)}/></h3>
            <Button name={'x'} callback={() => onClickHandler(todolistId)}/>
        </div>
    );
};