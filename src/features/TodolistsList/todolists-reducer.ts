import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType} from "../../app/store";
import {RequestStatusType, setErrorActionType, setStatusAC, setStatusActionType} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist,filter:'all',entityStatus:'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)
        }
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all',entityStatus:'idle'}))
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, newFilter} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists} as const)


// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
     todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
     todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title:string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
     todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
     todolistsAPI.updateTodolist(todolistId,title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId,title))
        })
}

// types
export type TodolistsActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | setErrorActionType
    | setStatusActionType

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus:RequestStatusType
}












