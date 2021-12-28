import {TaskType, TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListACType, RemoveTodoListACType, todoListID_1, todoListID_2} from "./reducerTodoLists";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;


type AllACTypes = RemoveTaskACType | ChangeTaskTitleACType | AddTaskACType | ChangeTaskStatusACType | AddTodoListACType | RemoveTodoListACType;

const initialState: TasksStateType = {

    [todoListID_1]: [
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: true },
        {id: v1(), title: 'REACT', isDone: false},
        { id: v1(), title: 'Redux', isDone: false },
    ],
    [todoListID_2]: [
        { id: v1(), title: 'Meat', isDone: true },
        { id: v1(), title: 'Beer', isDone: true },
        { id: v1(), title: 'Milk', isDone: false },
        { id: v1(), title: 'Bread', isDone: false },
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: AllACTypes ): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return { ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.id)};
        case "CHANGE_TASK_TITLE":
            return {...state, [action.todoListId]: state[action.todoListId].map(task => task.id === action.id ? { ...task, title: action.title } : task)};
        case "ADD_TASK":
            const newId = v1();
            const newTask: TaskType = {
                id: newId,
                title: action.title,
                isDone: true
            }
            return {...state, [action.todoListId]: [ ...state[action.todoListId], newTask ]};
        case "CHANGE_TASK_STATUS":
            return {...state, [action.todoListId]:  state[action.todoListId].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)};
        case "ADD_TODOLIST":
            return {...state, [action.todoListId]: []};
        case "REMOVE_TODOLIST":
            delete state[action.todoListId];
            return {...state};
        default:
            return state;
    }
}

export const removeTaskAC = (id: string, todoListId: string) => {
    return {type: "REMOVE_TASK", id: id, todoListId: todoListId} as const;
}

export const changeTaskTitleAC = (id: string, title: string, todoListId: string) => {
    return {type: "CHANGE_TASK_TITLE", id: id, title: title, todoListId: todoListId} as const;
}

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: "ADD_TASK", title: title, todoListId: todoListId} as const;
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string) => {
    return {type: "CHANGE_TASK_STATUS", id: id, isDone: isDone, todoListId: todoListId} as const;
}