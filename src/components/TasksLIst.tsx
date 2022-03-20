import React, {FC} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}
export const TasksLIst: FC<TasksLIstType> = ({tasks, removeTask}) => {
    return (
        <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)

                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        {t.title}
                        <Button callback={removeTaskHandler} name={'x'}/>
                    </li>
                )
            })}
        </ul>
    );
};
