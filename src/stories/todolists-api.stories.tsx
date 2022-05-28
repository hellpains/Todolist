import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";
import {dividerClasses} from "@mui/material";

export default {
    title: 'api'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])


    return <div>
        {JSON.stringify(state)}
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')


    const createTodolistHandler = () => {
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
    }


    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolistHandler}>add</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTodolistHandler = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
            .catch(error => console.log(error))
    }


    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={deleteTodolistHandler}>delete</button>
            </div>
        </div>

    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTodolistTitleHandler = () => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'new title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>

            <button onClick={updateTodolistTitleHandler}>update todolist title</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const deleteTaskHandler = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTaskHandler}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>

            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTodolistTitleHandler = () => {
        todolistsAPI.updateTask(todolistId,taskId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'new title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>

            <button onClick={updateTodolistTitleHandler}>update task title</button>
        </div>
    </div>
}