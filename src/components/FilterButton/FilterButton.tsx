import React, {FC} from 'react';
import {FilterType} from "../../App";
import {Button} from "../UniversalButton/Button";

type FilterButtonType = {
    changeFilter: (todolistId: string, value: FilterType) => void
    filter: FilterType
    todolistId: string
}
export const FilterButton: FC<FilterButtonType> = ({changeFilter, todolistId, filter}) => {

    const onClickFilterHandler = (value: FilterType) => {
        changeFilter(todolistId, value)
    }
    return (
        <div>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler('all')}
                name={'All'}/>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler('active')}
                name={'Active'}/>
            <Button
                filter={filter}
                callback={() => onClickFilterHandler('completed')}
                name={'Completed'}/>
        </div>
    );
};