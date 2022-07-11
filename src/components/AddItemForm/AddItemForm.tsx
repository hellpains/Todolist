import React, {FC, useState} from "react";
import {Input} from "../Input/Input";
import {IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import {TodolistDomainType} from "../../features/TodolistsList/todolists-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}


export const AddItemForm: FC<AddItemFormPropsType> = React.memo((
    {
        addItem, disabled = false
    }
) => {
    let [task, setTask] = useState('')
    let [error, setError] = useState('')

    const addItemHandler = () => {
        if (task.trim() !== "") {
            addItem(task.trim())
            setTask("")
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <Input
                disabled={disabled}
                onClickAddTask={addItemHandler}
                setError={setError}
                error={error}
                task={task}
                setTask={setTask}
            />
            <IconButton color={"primary"} onClick={addItemHandler} disabled={disabled}>
                <Add/>
            </IconButton>


        </div>
    )
})