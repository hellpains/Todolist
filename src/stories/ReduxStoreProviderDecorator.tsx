import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import { AppRootStateType} from "../app/store";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState :AppRootStateType= {
    todolists: [
        {id: 'todolistId2', title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'},
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status:TaskStatuses.Completed,todoListId:'todolistId1',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: v1(), title: "JS",  status:TaskStatuses.Completed,todoListId:'todolistId1',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk",  status:TaskStatuses.Completed,todoListId:'todolistId2',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: v1(), title: "React Book",  status:TaskStatuses.Completed,todoListId:'todolistId2',
                startDate:'', deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ]
    },
    app:{
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);




export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}