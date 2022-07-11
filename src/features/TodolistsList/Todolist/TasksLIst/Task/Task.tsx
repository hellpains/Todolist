import React, {ChangeEvent, useCallback} from 'react';
import s from "../TaskList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../../api/todolists-api";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type PropsType = {

    task: TaskType
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    todolistId: string
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
}

export const Task: React.FC<PropsType> = React.memo((
    {
        task, removeTask,
        changeStatus, todolistId, updateTaskTitle
    }
) => {
    const removeTaskHandler = (id: string) => {
        removeTask(todolistId, id)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.New
        changeStatus(todolistId, task.id,newIsDoneValue)
    }

    const updateTaskTitleHandler = useCallback((title: string, taskId: string) => {
        updateTaskTitle(todolistId, title, taskId)
    }, [todolistId, updateTaskTitle, task.title])


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.is_done : ''} >
            <Checkbox
                disabled={task.entityStatus==='loading'}
                {...label} defaultChecked
                onChange={onChangeHandler}
                checked={task.status ===TaskStatuses.Completed}
            />
            <EditableSpan
                title={task.title}
                onChange={(title: string) => updateTaskTitleHandler(title, task.id)}
            />
            <IconButton className={s.button} onClick={() => removeTaskHandler(task.id)} disabled={task.entityStatus==='loading'}>
                <Delete/>
            </IconButton>
        </div>
    );
});
