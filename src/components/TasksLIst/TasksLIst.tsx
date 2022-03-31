import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "../../App";
import {Button} from "../UniversalButton/Button";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
}
export const TasksLIst: FC<TasksLIstType> = ({tasks, removeTask, todolistId, changeStatus}) => {

    const removeTaskHandler = (todolistId: string, id: string) => removeTask(todolistId, id)

    return (
        <ul>
            {tasks.map(t => {
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(todolistId, t.id, event.currentTarget.checked)
                }
                return (
                    <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                        {t.title}
                        <Button callback={() => removeTaskHandler(todolistId, t.id)} name={'x'}/>
                    </li>
                )
            })}
        </ul>
    );
};