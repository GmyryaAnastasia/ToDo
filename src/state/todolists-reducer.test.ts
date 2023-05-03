import {v1} from "uuid";
import {FiltersType, TodolistsType} from "../App";
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', todolistID: todolistID1})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let NewTodolistTitle = 'New Todolist'

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: NewTodolistTitle})
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')

})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FiltersType = 'Completed'

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    //
    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     todolistID: todolistId2,
    //     filter: newFilter
    // }

    const endState = todolistsReducer(startState, {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: todolistId2,
        filter: newFilter
    })

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
