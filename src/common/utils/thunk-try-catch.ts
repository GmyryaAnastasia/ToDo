import { AppDispatchType, AppRootStateType } from 'app/store';
import { handleServerNetworkError } from 'common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ResponseType } from 'common/types';
import {appAction} from "app/app.reducer";

/**
 * Обеспечивает обработку ошибок и управление состоянием загрузки в асинхронных санках.
 *
 * @async
 * @param {BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>} thunkAPI - Объект `BaseThunkAPI`, который предоставляет доступ к объектам `dispatch` и `rejectWithValue`.
 * @param {Function} logic - Функция, содержащая логику санка, которую нужно выполнить.
 * @returns {(Promise<ResponseType | null>)} - Промис, содержащий ответ на запрос или `null`, если запрос не удался.
 */

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>,
    logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appAction.setAppStatus({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch,e)
        return rejectWithValue(null)
    } finally {
        dispatch(appAction.setAppStatus({status: 'idle'}))
    }
}
