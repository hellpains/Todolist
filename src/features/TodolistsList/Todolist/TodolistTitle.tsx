import React, {FC, useCallback} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import s from "./TasksLIst/TaskList.module.css";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type TodolistHeaderType = {
    title: string
    removeTodolist: (todolistId: string) => void
    todolistId: string
    updateTodolistTitle: (todolistId: string, title: string) => void
}
export const TodolistTitle: FC<TodolistHeaderType> = React.memo((
    {
        title, removeTodolist,
        todolistId, updateTodolistTitle
    }
) => {
    const onClickHandler =useCallback( (todolistId: string) => {
        removeTodolist(todolistId)
    },[removeTodolist])

    

    const updateTodolistTitleHandler = useCallback ( (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    },[todolistId,title])

    return (
        <div className={s.todolistTitleBlock}>
            <h3><EditableSpan title={title} onChange={(title: string) => updateTodolistTitleHandler(title)}/>
                <IconButton className={s.button} onClick={() => onClickHandler(todolistId)}>
                    <Delete/>
                </IconButton>
            </h3>
        </div>
    );
});