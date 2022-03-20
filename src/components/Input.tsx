import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

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
        console.log(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    return (
        <input
            className={error ? 'error' : ''}
            onKeyPress={onKeyPressHandler}
            value={task}
            onChange={onChangeInputHandler}
        />
    );
};
