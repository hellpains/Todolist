import {TasksStateType,} from "../../components/App/App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "../todolistReducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

type ActionTypeTasksReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>




const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeTasksReducer): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASKS': {
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(), title: action.title,status:TaskStatuses.New,todoListId:action.todolistId,
                    startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''
                }, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASKS-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        }
        case 'CHANGE-TASKS-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
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

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASKS',
        todolistId,
        title
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status:TaskStatuses) => {
    return {
        type: 'CHANGE-TASKS-STATUS',
        todolistId,
        taskId,
        status,
    } as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASKS-TITLE',
        todolistId,
        taskId,
        title
    } as const
}