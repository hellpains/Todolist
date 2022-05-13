import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type InputType = {
    task: string
    setTask: (task: string) => void
    error: string
    setError: (error: string) => void
    onClickAddTask: () => void
}

export const Input: FC<InputType> = (
    {
        setTask,
        task,
        error,
        onClickAddTask,
        setError,
    }
) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError('')
        }
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    return (

        <TextField
            error={!!error}
            id="standard-basic" label="name" variant="standard"
            onKeyPress={onKeyPressHandler}
            value={task} onChange={onChangeInputHandler}
            helperText={error}
            style={{marginBottom: '10px'}}
        />


    );
};


