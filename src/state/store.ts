import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistReducer/todolists-reducer";
import {tasksReducer} from "./tasksReducer/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export type DispatchType  = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>()


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))

// @ts-ignore
window.store = store;