import React, {FC} from 'react';
import {EditableSpan} from "../UniversalButton/EditableSpan";
import {MyButton} from "../UniversalButton/MyButton";
import s from "../TasksLIst/TaskList.module.css";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type TodolistHeaderType = {
    title: string
    removeTodolist: (todolistId: string) => void
    todolistId: string
    updateTodolistTitle: (todolistId: string, title: string) => void
}
export const TodolistTitle: FC<TodolistHeaderType> = (
    {
        title, removeTodolist,
        todolistId, updateTodolistTitle
    }
) => {
    const onClickHandler = (todolistId: string) => {
        removeTodolist(todolistId)
    }
    const flex = {
        display: 'flex'
    }
    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }
    return (
        <div style={flex}>
            <h3><EditableSpan title={title} onChange={(title: string) => updateTodolistTitleHandler(title)}/>
                <IconButton className={s.button} onClick={() => onClickHandler(todolistId)}>
                    <Delete/>
                </IconButton>
            </h3>
        </div>
    );
};