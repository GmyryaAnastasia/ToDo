import {Dispatch} from "redux";
import {ResponseType} from 'common/types/common.types'
import {appAction} from "app/app.reducer";

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */
export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>, showError: boolean = true) => {
    if (showError) {
        dispatch(appAction.setError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
}
