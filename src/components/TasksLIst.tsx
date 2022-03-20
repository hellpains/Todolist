import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}
export const TasksLIst: FC<TasksLIstType> = ({tasks, removeTask, changeStatus}) => {

    const removeTaskHandler = (id: string) => removeTask(id)

    return (
        <ul>
            {tasks.map(t => {
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(t.id, event.currentTarget.checked)
                }
                return (
                    <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                        {t.title}
                        <Button callback={() => removeTaskHandler(t.id)} name={'x'}/>
                    </li>
                )
            })}
        </ul>
    );
};
