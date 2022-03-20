import React, {FC} from 'react';

type TodolistHeaderType = {
    title: string
}
export const TodolistHeader: FC<TodolistHeaderType> = ({title}) => {
    return (
        <div>
            <h3>{title}</h3>
        </div>
    );
};