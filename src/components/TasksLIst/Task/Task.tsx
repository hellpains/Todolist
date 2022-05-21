import React, {ChangeEvent, useCallback} from 'react';
import s from "../TaskList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../UniversalButton/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../../App/App";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type PropsType={
    task:TaskType
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
}

export const Task:React.FC<PropsType> =React.memo( (
    {
        task,removeTask,
        changeStatus,todolistId,updateTaskTitle
    }
) => {
    const removeTaskHandler = (id: string) => {
        removeTask(todolistId, id)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todolistId, task.id, event.currentTarget.checked)
    }

    const updateTaskTitleHandler = useCallback((title: string, taskId: string) => {
        updateTaskTitle(todolistId, title, taskId)
    }, [todolistId, updateTaskTitle,task.title])



    return (
        <div key={task.id} className={task.isDone === true ? s.is_done : ''}>
            <Checkbox
                {...label} defaultChecked
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan
                title={task.title}
                onChange={(title: string) => updateTaskTitleHandler(title, task.id)}
            />
            <IconButton className={s.button} onClick={() => removeTaskHandler(task.id)}>
                <Delete/>
            </IconButton>
        </div>
    );
});
