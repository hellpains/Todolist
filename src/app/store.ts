import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";

export type DispatchType  = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>()


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))


export type AppActionsType=TodolistsActionsType|TasksActionsType

// @ts-ignore
window.store = store;