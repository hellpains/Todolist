import React, {FC} from 'react';
import {FilterType} from "../App";
import {Button} from "./Button";

type FilterButtonType = {
    changeFilter: (value: FilterType) => void
    filter: FilterType
}
export const FilterButton: FC<FilterButtonType> = ({changeFilter, filter}) => {

    const onClickFilterHandler = (value: FilterType) => {
        changeFilter(value)
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
