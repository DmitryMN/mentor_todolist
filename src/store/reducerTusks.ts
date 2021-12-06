import {TaskType, TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;

type AllACTypes = RemoveTaskACType | ChangeTaskTitleACType | AddTaskACType | ChangeTaskStatusACType;

export const tasksReducer = (state: TasksStateType, action: AllACTypes ) => {
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
            return {...state, [action.todoListId]:  state[action.todoListId].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)}
        default:
            return  state;
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