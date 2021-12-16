import { TasksStateType } from "../App";
import { tasksReducer} from "./reducerTusks";
import { addTodoListAC, removeTodoListAC} from "./reducerTodoLists";
import { v1 } from "uuid";

let idCss: string;
let idJs: string;
let idReact: string;
let idBread: string;
let idMilk: string;
let idTea: string;

let todoList1: string
let todoList2: string 

let startState: TasksStateType

beforeEach(() => {
    idCss = v1();
    idJs = v1();
    idReact = v1();
    idBread = v1();
    idMilk = v1();
    idTea = v1();

    todoList1 = "todolistId1";
    todoList2 = "todolistId2";

    startState = {
        [todoList1]: [
            { id: idCss, title: "CSS", isDone: false },
            { id: idJs, title: "JS", isDone: true },
            { id: idReact, title: "React", isDone: false }
        ],
        [todoList2]: [
            { id: idBread, title: "bread", isDone: false },
            { id: idMilk, title: "milk", isDone: true },
            { id: idTea, title: "tea", isDone: false }
        ]
    };
});


test("new array should be added when new todolist is added", () => {
    // data
    const newTodolist = "Redux"

    let result = tasksReducer(startState, addTodoListAC(newTodolist));

    const keys = Object.keys(result);
    const newKey = keys.find(k => k != todoList1 && k != todoList2);
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(result[newKey]).toEqual([]);
});

test("propperty with todolistId should be removed", () => {
    // dat
    let result = tasksReducer(startState, removeTodoListAC(todoList2));

    const keys = Object.keys(result);
    expect(keys.length).toBe(1);
    expect(result[todoList2]).toBeUndefined();
});
