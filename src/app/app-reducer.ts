const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) =>
    ({type: 'APP/SET-ERROR', error} as const)


// thunks


// types
export type setErrorActionType = ReturnType<typeof setAppError>;
export type setStatusActionType = ReturnType<typeof setAppStatus>;
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppActionsType =
    | setStatusActionType
    | setErrorActionType
