import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "../../App";
import {EditableSpan} from "../UniversalButton/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import s from './TaskList.module.css'
import {Delete} from "@mui/icons-material";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};
type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
}
export const TasksLIst: FC<TasksLIstType> = (
    {
        tasks, removeTask,
        changeStatus, todolistId,
        updateTaskTitle
    }
) => {


    const removeTaskHandler = (id: string) => removeTask(todolistId, id)
    const updateTaskTitleHandler = (title: string, taskId: string) => {
        updateTaskTitle(todolistId, title, taskId)
    }
    return (
        <div>
            {tasks.map(t => {
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(todolistId, t.id, event.currentTarget.checked)
                }
                return (
                    <div key={t.id} className={t.isDone === true ? s.is_done : ''}>

                        <Checkbox
                            {...label} defaultChecked
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        <EditableSpan
                            title={t.title}
                            onChange={(title: string) => updateTaskTitleHandler(title, t.id)}
                        />
                        <IconButton className={s.button} onClick={() => removeTaskHandler(t.id)}>
                            <Delete/>
                        </IconButton>
                    </div>
                )
            })}
        </div>
    );
};

