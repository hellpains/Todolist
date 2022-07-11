import React, {FC, useCallback} from 'react';
import {Button} from "@mui/material";
import s from "./FilterButton.module.css";
import {FilterType} from "../../features/TodolistsList/todolists-reducer";


type FilterButtonType = {
    disabled: boolean
    changeFilter: (todolistId: string, value: FilterType) => void
    filter: FilterType
    todolistId: string
}
export const FilterButton: FC<FilterButtonType> = (
    {
        changeFilter, filter,
        todolistId, disabled
    }
) => {
    const onClickFilterHandler = useCallback((todolistId: string, value: FilterType) => {
        changeFilter(todolistId, value)
    }, [changeFilter, todolistId])
    return (
        <div>

            <Button
                disabled={disabled}
                variant={filter === 'all' ? "contained" : "text"}
                color={"inherit"}
                onClick={() => onClickFilterHandler(todolistId, 'all')}
            >All</Button>
            <Button
                disabled={disabled}
                variant={filter === 'active' ? "contained" : "text"}
                color={"primary"}
                onClick={() => onClickFilterHandler(todolistId, 'active')}
            >Active</Button>
            <Button
                disabled={disabled}
                variant={filter === 'completed' ? "contained" : "text"}
                color={"error"}
                onClick={() => onClickFilterHandler(todolistId, 'completed')}

            >Completed</Button>
        </div>
    );
};