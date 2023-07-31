import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";
import {RequestStatusType} from "app/app.reducer";
import {ResponseType} from 'common/types/common.types'

export const todolistsApi = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(arg:ChangeTitleType) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${arg.todolistId}`, {title:arg.title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${arg.todolistId}/tasks`, {title: arg.title})
    },
    deleteTasks(arg: RemoveTaskType) {
        return instance.delete<ResponseType>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type ChangeTitleType= {
    todolistId: string,
    title: string
}

export type RemoveTaskType = {
    todolistId: string,
    taskId: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate?: string
    order?: number
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type DomainType = TaskType & {
    eStatus: RequestStatusType

}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export type AddTaskArgType = {
    todolistId: string,
    title: string
}
export type UpdateTaskArgType = {
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
}
type UpdateDomainTaskModelType = {
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
