import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTitleTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.status
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            // const copyState = {...state}
            // delete copyState[action.todolistId]
            // return copyState
        const {[action.todolistId]:[],...rest}= {...state}
            return rest
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean) =>({type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const)
export const changeTitleTaskAC = (todolistId: string, taskId: string, title: string) =>({type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const)
export const addTodolistAC = ( title: string) =>({type: 'ADD-TODOLIST', title,todolistId:v1()} as const)
export const removeTodolistAC = (todolistId: string) =>( {type: 'REMOVE-TODOLIST', todolistId} as const)
