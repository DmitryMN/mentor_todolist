import { type } from "os";
import { v1 } from "uuid";
import { TodoListType, FilterValuesType } from "../App"


type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
type AddTodoListACType = ReturnType<typeof addTodoListAC>;
type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC >;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

type AllACTypes = AddTodoListACType | RemoveTodoListACType | ChangeTodoListTitleACType | ChangeFilterACType ;

export const todoListsReducer = (todoLists: Array<TodoListType>,  action: AllACTypes ): Array<TodoListType> => {
    switch(action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListId);
        case "ADD_TODOLIST":
            const todoListID = v1()
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList];
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)       
        case "CHANGE_FILTER":
            return todoLists.map(tl => tl.id === action.id ? { ...tl,  filter: action.filter} : tl);
        default: return todoLists
    }
}

export const removeTodoListAC = (id: string) => { 
    return {type: "REMOVE_TODOLIST", todoListId: id} as const; 
}

export const addTodoListAC = (title: string) => {
    return {type: "ADD_TODOLIST", title: title} as const;
}

export const changeTodoListTitleAC = (title: string, id: string) => {
    return { type: "CHANGE_TODOLIST_TITLE", title: title, id: id} as const;
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE_FILTER" as const, id: id, filter: filter } as const
}