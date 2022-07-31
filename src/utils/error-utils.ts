import {setAppError, setAppStatus} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootActionsType} from "../app/store";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppRootActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}