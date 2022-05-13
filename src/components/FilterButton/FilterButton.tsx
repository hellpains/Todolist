import React, {FC, useCallback} from 'react';
import {FilterType} from "../../App";
import {MyButton} from "../UniversalButton/MyButton";
import {Button} from "@mui/material";
import s from "./FilterButton.module.css";

type FilterButtonType = {
    changeFilter: (todolistId: string, value: FilterType) => void
    filter: FilterType
    todolistId: string
}
export const FilterButton: FC<FilterButtonType> = (
    {
        changeFilter, filter,
        todolistId,
    }
) => {

    const onClickFilterHandler =useCallback( (todolistId: string, value: FilterType) => {
        changeFilter(todolistId, value)
    },[changeFilter,todolistId])
    return (
        <div>

            <Button
                variant={filter === 'all' ? "contained" : "text"}
                color={"inherit"}
                onClick={() => onClickFilterHandler(todolistId, 'all')}
            >All</Button>
            <Button
                variant={filter === 'active' ? "contained" : "text"}
                color={"primary"}
                onClick={() => onClickFilterHandler(todolistId, 'active')}
            >Active</Button>
            <Button
                variant={filter === 'completed' ? "contained" : "text"}
                color={"error"}
                onClick={() => onClickFilterHandler(todolistId, 'completed')}
                
            >Completed</Button>
        </div>
    );
};