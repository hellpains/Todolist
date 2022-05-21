import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistReducer/todolists-reducer";
import {tasksReducer} from "./tasksReducer/tasks-reducer";


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;