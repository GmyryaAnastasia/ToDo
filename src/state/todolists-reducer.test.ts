import {v1} from "uuid";
import {FiltersType, TodolistsType} from "../App";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, todolistsReducer} from "./todolists-reducer";
import {removeTodolistAC} from "./tasks-reducer";

let todolistId1:string
let todolistId2: string
let startState: TodolistsType[]

beforeEach(() => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')

})

test('correct filter of todolist should be changed', () => {
    let newFilter: FiltersType = 'Completed'
    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist Title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
    expect(endState[0].title).toBe( 'What to learn')
    expect(endState[1].title).toBe( newTodolistTitle)
  })
