import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const onEditMode = () => {
        setEditMode(true)
        if(props.title){
            setTitle(props.title)
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            offEditMode()
        }}
    return (
        editMode
            ? <TextField
                style={{width: "150px"}}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            : <span>{props.title}
                <IconButton  onClick={onEditMode} size={"small"}>
                    <Edit fontSize={"small"}/>
                </IconButton>
                {/*<button onClick={onEditMode}>edit</button>*/}
              </span>

    )
});

export default EditableSpan;