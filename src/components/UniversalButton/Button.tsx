import React, {FC} from 'react';
import s from './../FilterButton/FilterButton.module.css'
import {FilterType} from "../../App";

type ButtonType = {
    name: string
    callback: () => void
    filter?: FilterType
}


export const Button: FC<ButtonType> = ({name, callback, filter}) => {

    const nameLowerCase = name.toLowerCase()

    const onClickButtonHandler = () => {
        callback()
    }

    return (
        <button
            className={filter === nameLowerCase ? s.active : ''}
            onClick={onClickButtonHandler}>{name}</button>
    );
};