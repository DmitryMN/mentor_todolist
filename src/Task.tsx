import React, {ChangeEvent} from "react";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";


type TaskPropsType = {
    id: string
    task: TaskType

}


const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(task.id, props.id)
    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
    const changeTitle = (title: string)=>
        props.changeTaskTitle(task.id, title, props.id);


    return (
        <ListItem
        disableGutters
        className={task.isDone ? "is-done" : ""}
        divider
        key={task.id}
        style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px"
        }}
    >
        <Checkbox
            color={"primary"}
            onChange={changeStatus}
            checked={task.isDone}
        />
        <EditableSpan title={task.title} setNewTitle={changeTitle}/>
        <IconButton onClick={removeTask}>
            <Delete fontSize={"small"}/>
        </IconButton>
    </ListItem>
    );
});

export default Task;