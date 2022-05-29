// import {} from "../../components/App/App";
import {v1} from "uuid";
import {TodolistType} from "../../api/todolists-api";

type ActionTypeTodolistsReducer =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistDomainType> = []


export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypeTodolistsReducer): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all", addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {
                ...tl,
                title: action.newTodolistTitle
            } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        newTodolistTitle
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        newFilter
    } as const
}