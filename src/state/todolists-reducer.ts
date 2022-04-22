import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypeTodolistsReducer): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.payload.title, filter: action.payload.filter}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTodolistTitle
            } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
        }
        default:
            throw new Error("I don't understand this type")
    }
}


type ActionTypeTodolistsReducer =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (id: string, title: string, filter: FilterType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id,
            title,
            filter
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTodolistTitle
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}