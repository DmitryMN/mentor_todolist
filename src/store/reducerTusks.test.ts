import {TasksStateType} from "../App";
import {tasksReducer, removeTaskAC, changeTaskTitleAC, addTaskAC, changeTaskStatusAC} from "./reducerTusks";
import {v1} from "uuid";

test("correct task removed", () => {
    // data
    const idCss = v1();
    const idJs = v1();
    const idReact = v1();
    const idBread = v1();
    const idMilk = v1();
    const idTea = v1();

    const todoList1 = "todolistId1";
    const todoList2 = "todolistId2";

    const startState: TasksStateType = {
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
    let result = tasksReducer(startState, removeTaskAC(idCss, todoList1));
    expect(result[todoList1].length).toBe(2);
    expect(result[todoList1][0].title).toBe("JS");

});

test("correct change task title", () => {
    // data
    const idCss = v1();
    const idJs = v1();
    const idReact = v1();
    const idBread = v1();
    const idMilk = v1();
    const idTea = v1();

    const todoList1 = "todolistId1";
    const todoList2 = "todolistId2";

    const title = "cheese";

    const startState: TasksStateType = {
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
    let result = tasksReducer(startState, changeTaskTitleAC(idTea, title, todoList2));
    expect(result[todoList2].length).toBe(3);
    expect(result[todoList2][2].title).toBe("cheese");

});

test("correct add task", () => {
    // data
    const idCss = v1();
    const idJs = v1();
    const idReact = v1();
    const idBread = v1();
    const idMilk = v1();
    const idTea = v1();

    const todoList1 = "todolistId1";
    const todoList2 = "todolistId2";

    const newTitle = "Redux"

    const startState: TasksStateType = {
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
    let result = tasksReducer(startState, addTaskAC(newTitle, todoList1));
    expect(result[todoList1].length).toBe(4);
    expect(result[todoList1][3].title).toBe("Redux");
});

test("correct change task status", () => {
    // data
    const idCss = v1();
    const idJs = v1();
    const idReact = v1();
    const idBread = v1();
    const idMilk = v1();
    const idTea = v1();

    const todoList1 = "todolistId1";
    const todoList2 = "todolistId2";

    const startState: TasksStateType = {
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
    let result = tasksReducer(startState, changeTaskStatusAC(idReact, true, todoList1));
    expect(result[todoList1].length).toBe(3);
    expect(result[todoList1][2].isDone).toBe(true);
});



