import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../../api/todolists-api";

export default {
    name: 'Task Component',
    component: Task
}

const removeTaskCallback = action('Remove Task')
const changeStatusCallback = action('Status changed ')
const updateTaskTitleCallback = action('Title changed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            task={ {id:'1',status:TaskStatuses.Completed,title:"CSS",todoListId:'todolistId2',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''} }
            removeTask={removeTaskCallback}
            changeStatus={changeStatusCallback}
            updateTaskTitle={updateTaskTitleCallback}
            todolistId={ "todolistId1" }
        />

        <Task
            task={ {id:'2',status:TaskStatuses.New,title:"JS",todoListId:'todolistId2',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''} }
            removeTask={removeTaskCallback}
            changeStatus={changeStatusCallback}
            updateTaskTitle={updateTaskTitleCallback}
            todolistId={ "todolistId2" }
        />
    </>
}


