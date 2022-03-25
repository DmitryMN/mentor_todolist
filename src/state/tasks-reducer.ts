import { TasksStateType } from '../App';
import { AddTodolistActionType, RemoveTodolistActionType, setTodoListsAC} from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType <typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>;


const initialState: TasksStateType = {
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            return {...state, [action.todoListId]: action.tasks}
        }
        case 'SET_TODO_LISTS': {
            const copyState = {...state}
            action.todoLists.forEach((el => {
                copyState[el.id] = []
            }));
            return copyState;
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            stateCopy[action.task.todoListId] = [action.task, ...stateCopy[action.task.todoListId]]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.newTodoList.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {type: 'SET_TASKS', tasks, todoListId} as const;
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const; 
}


export const fetchTasksThunk = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId).then((response) => {
            dispatch(setTasksAC(response.data.items, todoListId));
        })
    }
}
export const removeTaskThunk = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoListId, taskId).then((response) => {
            if(response.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId));
            }            
        });
    }
}
export const createTaskThunk = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoListId, title).then((response) => {
            dispatch(addTaskAC(response.data.data.item));
        });
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


// export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
//     (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             //throw new Error("task not found in the state");
//             console.warn('task not found in the state')
//             return
//         }

//         const apiModel: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             title: task.title,
//             status: task.status,
//             ...domainModel
//         }

//         todolistsAPI.updateTask(todolistId, taskId, apiModel)
//             .then(res => {
//                 const action = updateTaskAC(taskId, domainModel, todolistId)
//                 dispatch(action)
//             })
// }

export const updateTaskThunk = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch:  Dispatch, getState: () => AppRootStateType) => {
        const allTaskFromState = getState().tasks;
        const tasksForCurrentTodolist = allTaskFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
              return t.id === taskId
        });
        if(task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then((response) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            });
        }
    }
}

export const updateTaskTitleThunk = (taskId: string, updateTitle: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTaskFromState = getState().tasks;
        const tasksForCurrentTodolist  = allTaskFromState[todolistId];
        const task = tasksForCurrentTodolist.find(task => task.id === taskId);
        if(task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: updateTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            }).then((response) => {
                dispatch(changeTaskTitleAC(taskId, updateTitle, todolistId));
            });
        }
    }
}