import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((
    {
        title, onChange
    }
) => {
    console.log('EditableSpan')
    let [newTitle, setNewTitle] = useState(title)
    let [edit, setEdit] = useState(false)

    const editOnHandler = () => {
        setEdit(true)
    }
    const editOffHandler = () => {
        setEdit(false)
        onChange(newTitle)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        edit
            ? <TextField
                variant={'standard'}
                onChange={onChangeInputHandler}
                value={newTitle}
                onBlur={editOffHandler}
                autoFocus/>
            : <span onDoubleClick={editOnHandler}> {title}</span>
    )
})