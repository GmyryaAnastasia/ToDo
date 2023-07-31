import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {ResponseType} from 'common/types/common.types'

export const authAPI = {
    login(data: LoginPropsType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginPropsType>(`/auth/login`, data)
    },

    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('/auth/me')
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export type LoginPropsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type AuthType = {
    id: number
    email: string
    login: string
}