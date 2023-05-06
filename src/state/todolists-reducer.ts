import {FiltersType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>

export const todolistsReducer = (state: TodolistsType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistID)
        case 'ADD-TODOLIST':
            let NewTodolst = {id: action.todolistId, title: action.title, filter: 'all'}
            return [NewTodolst, ...state]
        case'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}
const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
const changeFilterAC = (todolistID: string, filter: FiltersType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, filter} as const
}