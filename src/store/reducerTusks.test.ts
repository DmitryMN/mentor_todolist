import { TasksStateType } from "../App";
import { tasksReducer, removeTaskAC, changeTaskTitleAC, addTaskAC, changeTaskStatusAC } from "./reducerTusks";
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

test("correct task removed", () => {

    let result = tasksReducer(startState, removeTaskAC(idCss, todoList1));
    expect(result[todoList1].length).toBe(2);
    expect(result[todoList1][0].title).toBe("JS");

});

test("correct change task title", () => {
    // data

    const title = "cheese";

    let result = tasksReducer(startState, changeTaskTitleAC(idTea, title, todoList2));
    expect(result[todoList2].length).toBe(3);
    expect(result[todoList2][2].title).toBe("cheese");

});

test("correct add task", () => {
    // data
    const newTitle = "Redux"

    let result = tasksReducer(startState, addTaskAC(newTitle, todoList1));
    expect(result[todoList1].length).toBe(4);
    expect(result[todoList1][3].title).toBe("Redux");
});

test("correct change task status", () => {
    // data
    let result = tasksReducer(startState, changeTaskStatusAC(idReact, true, todoList1));
    expect(result[todoList1].length).toBe(3);
    expect(result[todoList1][2].isDone).toBe(true);
});




