import React, {FC, useState} from "react";
import {Input} from "../Input/Input";
import {Button, IconButton} from "@mui/material";
import {MyButton} from "./MyButton";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormPropsType> = (
    {
        addItem
    }
) => {
    let [task, setTask] = useState('')
    let [error, setError] = useState('')

    const onClickAddTask = () => {
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
                onClickAddTask={onClickAddTask}
                setError={setError}
                error={error}
                task={task}
                setTask={setTask}
            />
            <IconButton color={"primary"} onClick={onClickAddTask}>
                <Add/>
            </IconButton>
        </div>
    )
}