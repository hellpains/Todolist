import React, { FC} from 'react';
import {TaskType} from "../../App";
import {Task} from "./Task/Task";


type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    updateTaskTitle: (todolistId: string, title: string, taskId: string) => void
}
export const TasksList: FC<TasksListType> = React.memo((
    {
        tasks, removeTask,
        changeStatus, todolistId,
        updateTaskTitle
    }
) => {


    return (
        <div>
            {tasks.map(t => {
                return(
                    <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        updateTaskTitle={updateTaskTitle}
                        todolistId={todolistId}
                    />
                )
            })}
        </div>
    );
});

