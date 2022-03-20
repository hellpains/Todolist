import React, {FC} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}
export const TasksLIst: FC<TasksLIstType> = ({tasks, removeTask}) => {

    const removeTaskHandler = (id: string) => removeTask(id)

    return (
        <ul>
            {tasks.map(t => {
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        {t.title}
                        <Button callback={() => removeTaskHandler(t.id)} name={'x'}/>
                    </li>
                )
            })}
        </ul>
    );
};
