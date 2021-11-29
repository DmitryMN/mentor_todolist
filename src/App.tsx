import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@material-ui/core';
import { Menu } from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" }
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: true },
            // {id: v1(), title: 'JS, REACT', isDone: false},
            { id: v1(), title: 'Redux', isDone: false },
        ],
        [todoListID_2]: [
            { id: v1(), title: 'Meat', isDone: true },
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Bread', isDone: false },
        ],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)
        })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? { ...t, isDone } : t)
        })
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? { ...t, title } : t)
        })
    }

    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter } : tl))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, title } : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({ ...tasks, [todoListID]: [] })
    }



    // UI:
    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton>
                        <Menu>
                        </Menu>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px 0"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
