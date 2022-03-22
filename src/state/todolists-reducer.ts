import { v1 } from 'uuid';
import { TodolistType } from '../api/todolists-api'
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolists-api";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    // title: string
    // todolistId: string
    newTodoList: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}



type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | ReturnType<typeof setTodoListsAC>

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET_TODO_LISTS": {
            return action.todoLists.map(todoList => ({
                ...todoList, filter: "all"
            }))
        }
        case 'REMOVE-TODOLIST': {
            debugger;
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.newTodoList.id,
                title: action.newTodoList.title,
                filter: 'all',
                addedDate: action.newTodoList.addedDate,
                order: action.newTodoList.order,
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
}
export const addTodolistAC = (newTodoList: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newTodoList};
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
}

export const setTodoListsAC = (todoLists: Array<TodolistType>) => {
    return {type: 'SET_TODO_LISTS', todoLists} as const;
}

export const fetchTodoListsThunk = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists().then((response) => {
            dispatch(setTodoListsAC(response.data));
        })
    }
}

export const createTodolistThunk = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title).then((response) => {
            if(response.data.resultCode === 0) {
                let newTodoList: TodolistType = response.data.data.item;
                dispatch(addTodolistAC(newTodoList));
            }
        });
    }
}

export const removeTodoListThunk = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(id).then((response) => {
            dispatch(removeTodolistAC(id));
        })
    }
}
