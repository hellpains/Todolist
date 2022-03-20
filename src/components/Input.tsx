import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

type InputType = {
    task: string
    setTask: (task: string) => void
    addTask: (title: string) => void
}

export const Input: FC<InputType> = ({setTask, task, addTask}) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(task)
            setTask("")
        }
    }

    return (
        <input onKeyPress={onKeyPressHandler} value={task} onChange={onChangeInputHandler}/>
    );
};
