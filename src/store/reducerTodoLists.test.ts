import { v1 } from "uuid";
import { TodoListType, FilterValuesType } from "../App";
import { todoListsReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeFilterAC } from "./reducerTodoLists";


test("correct todolist removed", () => {
    // data
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoLists: Array<TodoListType> = [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" }
    ];

    let result = todoListsReducer(todoLists, removeTodoListAC(todoListID_1));
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(todoListID_2);
});

test("correct todolist add", () => {
    // data
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const addTitle = "add new title";

    const todoLists: Array<TodoListType> = [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" }
    ];

    let result = todoListsReducer(todoLists, addTodoListAC(addTitle));
    expect(result.length).toBe(3);
    expect(result[2].title).toBe(addTitle);
});

test("correct change todolist title ", () => {
    // data
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const newTitle = "New Title";

    const todoLists: Array<TodoListType> = [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" }
    ];

    let result = todoListsReducer(todoLists, changeTodoListTitleAC(newTitle, todoListID_2));
    expect(result[0].title).toBe("What to learn");
    expect(result[1].title).toBe(newTitle);
});

test("correct change filter", () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const newFilter: FilterValuesType = "active"

    const todoLists: Array<TodoListType> = [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" }
    ];

    const result = todoListsReducer(todoLists, changeFilterAC(todoListID_2, newFilter));
    expect(result[0].filter).toBe("all");
    expect(result[1].filter).toBe(newFilter);

});


