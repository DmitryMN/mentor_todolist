import React, {ChangeEvent, KeyboardEvent,  useCallback,  useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { title } from "process";
import Task from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string)=> void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {



    // const jsxTaskElements = props.tasks.map(task => {
    //     const removeTask = () => props.removeTask(task.id, props.id)
    //     const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>
    //             props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
    //     const changeTitle = (title: string)=>
    //         props.changeTaskTitle(task.id, title, props.id);

    //     return (
    //         <ListItem
    //             disableGutters
    //             className={task.isDone ? "is-done" : ""}
    //             divider
    //             key={task.id}
    //             style={{
    //                 display: "flex",
    //                 justifyContent: "space-between",
    //                 padding: "0px"
    //             }}
    //         >
    //             <Checkbox
    //                 color={"primary"}
    //                 onChange={changeStatus}
    //                 checked={task.isDone}
    //             />
    //             <EditableSpan title={task.title} setNewTitle={changeTitle}/>
    //             <IconButton onClick={removeTask}>
    //                 <Delete fontSize={"small"}/>
    //             </IconButton>
    //         </ListItem>)
    // })

    const addTask =  useCallback((title: string) => {
            props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const setAll = () => props.changeFilter('all', props.id)
    const setActive = () => props.changeFilter('active', props.id)
    const setCompleted = () => props.changeFilter('completed', props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)


    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    return (
        <div className="todoList">
            <Typography variant={"h6"} align={"center"} style={{fontWeight: "bold"}}>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={()=>props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask} />
            <List>
                { props.tasks.map(task => <Task id={props.id} task={task} />) }
            </List>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        variant={"contained"} size={"small"} disableElevation
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={setAll}>All</Button>
                    <Button
                        variant={"contained"} size={"small"} disableElevation
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={setActive}>Active</Button>
                    <Button
                        variant={"contained"} size={"small"} disableElevation
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    )
});

export default TodoList;