import React, {FC} from 'react';
import {FilterType} from "../App";
import {Button} from "./Button";

type FilterButtonType = {
    changeFilter: (value: FilterType) => void
}
export const FilterButton: FC<FilterButtonType> = ({changeFilter}) => {

    const onClickFilterHandler = (value: FilterType) => {
        changeFilter(value)
    }

    return (
        <div>
            <Button callback={() => onClickFilterHandler('all')} name={'All'}/>
            <Button callback={() => onClickFilterHandler('active')} name={'Active'}/>
            <Button callback={() => onClickFilterHandler('completed')} name={'Completed'}/>
        </div>
    );
};
