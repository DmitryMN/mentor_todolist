import React, {ChangeEvent, useCallback} from "react";
import { Checkbox, IconButton, ListItem } from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";


type TaskPropsType = {
    id: string
    task: TaskType
    removeTask: (taskId: string, toDolistId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, toDoListId: string) => void
    changeTitle: (taskId: string, title: string, toDoListId: string) => void
}


const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.id);

    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.id);

    const changeTitle = useCallback((title: string)=>
        props.changeTitle(props.task.id, title, props.id), [props.changeTitle, props.id]);

    return (
        <ListItem
        disableGutters
        className={props.task.isDone ? "is-done" : ""}
        divider
        key={props.task.id}
        style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px"
        }}
    >
        <Checkbox
            color={"primary"}
            onChange={changeStatus}
            checked={props.task.isDone}
        />
        <EditableSpan title={props.task.title} setNewTitle={changeTitle}/>
        <IconButton onClick={removeTask}>
            <Delete fontSize={"small"}/>
        </IconButton>
    </ListItem>
    );
});

export default Task;