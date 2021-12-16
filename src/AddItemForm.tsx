import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const errorMsgStyles = { backgroundColor: "red", color: "white", fontWeight: 900 }
    const errorInputStyles = { border: "2px solid red", outline: "none" }

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(event.currentTarget.value);
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true);

        }
        setTitle("");
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addItem();
        }}


    const errorMessage = error && <div style={errorMsgStyles}>Title is required!</div>
    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                label={"Title"}
                error={error}
                helperText={errorMessage}
            />
            <IconButton onClick={addItem}
                        color={"primary"}
                        size={"small"}
            >
                <AddBox fontSize={"large"}/>
            </IconButton>

            {/*{errorMessage}*/}
        </div>
    )
}
export default AddItemForm;