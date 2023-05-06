import {TasksStateType} from "../App";
import {
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskAC,
     addTodolistAC
} from "./tasks-reducer";

// test('correct task should be deleted from correct array', () => {
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     const startState: TaskStateType =   {
//         [todolistID1]: [
//             {id: '1', title: 'HTML&CSS', isDone: true},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'ReactJS', isDone: false},
//
//         ],
//         [todolistID2]: [
//             {id: '1', title: 'Rest API', isDone: true},
//             {id: '2', title: 'GraphQL', isDone: false},
//         ]
//     }
//     const endState = tasksReducer(startState, {type: 'REMOVE-TASK', todolistId: todolistID1,taskId:'2'})
//     expect(endState[todolistID1].length).toBe(2)
//     expect(endState[todolistID1][1].title).toBe('ReactJS')
//
// })
test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const action = addTaskAC('todolistId2', 'NewTask')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('NewTask')
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const action = changeTaskStatusAC('todolistId1', '2', false)
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const action = changeTitleTaskAC('todolistId1', '3', 'NewTitle')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('CSS')
    expect(endState['todolistId1'][2].title).toBe('NewTitle')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})





