import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,onChange
    }
) => {
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
            ? <input onChange={onChangeInputHandler}  value={newTitle} onBlur={editOffHandler} autoFocus/>
            : <span onDoubleClick={editOnHandler} > {title}</span>
    )
}