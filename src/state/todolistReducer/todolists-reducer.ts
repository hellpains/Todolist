import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";

type ActionTypeTodolistsReducer =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

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
            const newTodolist: TodolistDomainType ={...action.todolist,filter:'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {
                ...tl,
                title: action.title
            } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
} as const)

export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    newFilter
} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)


//thunk creator
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    return todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title:string) => (dispatch: Dispatch) => {
    return todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.updateTodolist(todolistId,title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId,title))
        })
}















