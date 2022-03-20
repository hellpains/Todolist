import React, {FC} from 'react';
import {TaskType} from "../App";

type TasksLIstType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}
export const TasksLIst: FC<TasksLIstType> = ({tasks, removeTask}) => {
    return (
        <ul>
            {tasks.map(t => {
                const onClickButtonHandler = () => removeTask(t.id)

                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        {t.title}
                        <button onClick={onClickButtonHandler}>x</button>
                    </li>
                )
            })}
        </ul>
    );
};
