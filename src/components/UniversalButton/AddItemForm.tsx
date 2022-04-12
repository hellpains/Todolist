import React, {FC, useState} from "react";
import {Input} from "../Input/Input";
import {Button} from "./Button";

type AddItemFormPropsType={
    addItem:(title:string)=>void
}
export const AddItemForm:FC<AddItemFormPropsType> = (
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

    return(
        <div>
            <Input
                onClickAddTask={onClickAddTask}
                setError={setError}
                error={error}
                task={task}
                setTask={setTask}
            />
            <Button
                name={'+'}
                callback={onClickAddTask}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}