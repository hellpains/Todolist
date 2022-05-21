import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
            task={ {id:'1',isDone:true,title:"CSS"} }
            removeTask={removeTaskCallback}
            changeStatus={changeStatusCallback}
            updateTaskTitle={updateTaskTitleCallback}
            todolistId={ "todolistId1" }
        />

        <Task
            task={ {id:'2',isDone:false,title:"JS"} }
            removeTask={removeTaskCallback}
            changeStatus={changeStatusCallback}
            updateTaskTitle={updateTaskTitleCallback}
            todolistId={ "todolistId2" }
        />
    </>
}
