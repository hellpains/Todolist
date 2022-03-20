import React, {FC} from 'react';
import {FilterType} from "../App";

type FilterButtonType = {
    changeFilter: (value: FilterType) => void
}
export const FilterButton: FC<FilterButtonType> = ({changeFilter}) => {
    return (
        <div>
            <button onClick={() => {
                changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                changeFilter('active')
            }}>Active
            </button>
            <button onClick={() => {
                changeFilter('completed')
            }}>Completed
            </button>
        </div>
    );
};
