import React, {FC} from 'react';
import {FilterType} from "../../App";
import {Button} from "../UniversalButton/Button";

type FilterButtonType = {
    changeFilter: (todolistId:string,value: FilterType) => void
    filter: FilterType
    todolistId:string
}
export const FilterButton: FC<FilterButtonType> = (
    {
        changeFilter, filter,
        todolistId,
    }
) => {

    const onClickFilterHandler = (todolistId:string,value: FilterType) => {
        changeFilter(todolistId,value)
    }
    return (
        <div>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler(todolistId,'all')}
                name={'All'}/>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler(todolistId,'active')}
                name={'Active'}/>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler(todolistId,'completed')}
                name={'Completed'}/>
        </div>
    );
};