import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {appAction} from "app/app.reducer";

/**
 * Обрабатывает ошибки, связанные с сетевыми запросами к серверу.
 *
 * @param {Dispatch} dispatch - функция для отправки сообщений в store Redux.
 * @param {unknown} e - Объект ошибки, который может быть типом Error или AxiosError<{ error: string }>.
 */

export const handleServerNetworkError = (dispatch: Dispatch, e: unknown) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appAction.setError({error}))
    } else {
        dispatch(appAction.setError({error: `Native error ${err.message}`}))
    }
}

