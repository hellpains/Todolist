import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "../../App";
import {Button} from "../UniversalButton/Button";
import {EditableSpan} from "../UniversalButton/EditableSpan";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    updateTaskTitle: (todolistId: string, title: string,taskId:string) => void
}
export const TasksLIst: FC<TasksLIstType> = (
    {
        tasks, removeTask,
        changeStatus, todolistId,
        updateTaskTitle
    }
) => {

    const removeTaskHandler = (id: string) => removeTask(todolistId, id)
    const updateTaskTitleHandler = (title:string,taskId:string) => {
        updateTaskTitle(todolistId,title,taskId)
    }
    return (
        <ul>
            {tasks.map(t => {
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(todolistId, t.id, event.currentTarget.checked)
                }
                return (
                    <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={(title: string) => updateTaskTitleHandler(title,t.id)}/>
                        <Button callback={() => removeTaskHandler(t.id)} name={'x'}/>
                    </li>
                )
            })}
        </ul>
    );
};

