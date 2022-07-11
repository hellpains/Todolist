import React, {FC, useCallback} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import s from "./TasksLIst/TaskList.module.css";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {TodolistDomainType} from "../todolists-reducer";

type TodolistHeaderType = {
    todolist:TodolistDomainType
    removeTodolist: (todolistId: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
}
export const TodolistTitle: FC<TodolistHeaderType> = React.memo((
    {
         removeTodolist,todolist,
        updateTodolistTitle
    }
) => {
    const onClickHandler =useCallback( (todolistId: string) => {
        removeTodolist(todolistId)
    },[removeTodolist])

    

    const updateTodolistTitleHandler = useCallback ( (newTitle: string) => {
        updateTodolistTitle(todolist.id, newTitle)
    },[todolist.id,todolist.title])

    return (
        <div className={s.todolistTitleBlock}>
            <h3><EditableSpan title={todolist.title} onChange={(title: string) => updateTodolistTitleHandler(title)}/>
                <IconButton className={s.button} onClick={() => onClickHandler(todolist.id)} disabled={todolist.entityStatus==="loading"}>
                    <Delete/>
                </IconButton>
            </h3>
        </div>
    );
});