import React, {FC} from 'react';
import {FilterType} from "../App";
import {Button} from "./Button";

type FilterButtonType = {
    changeFilter: (value: FilterType) => void
}
export const FilterButton: FC<FilterButtonType> = ({changeFilter}) => {

    const onClickFilterAllHandler = () => changeFilter('all')
    const onClickFilterActiveHandler = () => changeFilter('active')
    const onClickFilterCompletedHandler = () => changeFilter('completed')
    return (
        <div>
            <Button callback={onClickFilterAllHandler} name={'All'}/>
            <Button callback={onClickFilterActiveHandler} name={'Active'}/>
            <Button callback={onClickFilterCompletedHandler} name={'Completed'}/>
        </div>
    );
};
