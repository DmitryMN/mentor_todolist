import { combineReducers, createStore } from "redux";
import { todoListsReducer } from "./reducerTodoLists";
import { tasksReducer } from "./reducerTusks";



const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);