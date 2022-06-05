import {TasksStateType,} from "../../components/App/App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolistReducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

type ActionTypeTasksReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeTasksReducer): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = action.task
            return {
                ...state,
                [newTask.todoListId]: [action.task, ...state[newTask.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        }
        case 'CHANGE-TASKS-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: []
            }
        case "SET-TODOLISTS": {
            const copyState = {...state}

            action.todolists.forEach(tl => copyState[tl.id] = [])

            return copyState
        }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks

            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASKS-TITLE',
    todolistId,
    taskId,
    title
} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

//Thunk creator

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch,
                                                                                                             getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        console.warn("task not found in the state")
        return;
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    return todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(todolistId, taskId, apiModel))
        })
}


















