import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) =>
    ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitialized = (value: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', value} as const)


// thunks
export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
            dispatch(setAppInitialized(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type setErrorActionType = ReturnType<typeof setAppError>;
export type setStatusActionType = ReturnType<typeof setAppStatus>;
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType =
    | setStatusActionType
    | setErrorActionType
    | ReturnType<typeof setAppInitialized>;
