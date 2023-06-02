import {FiltersType} from "../App";
import {v1} from "uuid";
import {TodolistsType} from "../App";

const initialState:TodolistsType[]=[]
type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>

export const todolistsReducer = (state: TodolistsType[]=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [ {id: action.todolistId, title: action.title, filter: 'all'},...state]
        case'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        case'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id=== action.todolistId ? {...el, title: action.title} : el)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (title: string) => {
        return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const changeFilterAC = (todolistId: string, filter: FiltersType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
