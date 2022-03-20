import React, {FC} from 'react';

type ButtonType = {
    name: string
    callback: () => void
}
export const Button: FC<ButtonType> = ({name, callback}) => {

    const onClickButtonHandler = () => {
        callback()
    }

    return (
        <button onClick={onClickButtonHandler}>{name}</button>
    );
};


// button refactoring