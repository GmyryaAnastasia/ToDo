import {createSlice} from "@reduxjs/toolkit";
import {appAction} from "app/app.reducer";
import {tasksAction} from "features/Todolistlist/tasks.reducer";
import {todolistsAction} from "features/Todolistlist/todolists.reducer";
import {handleServerAppError} from "common/utils/handle-server-app-error";
import {handleServerNetworkError} from "common/utils/handle-server-network-error";
import {authAPI, LoginPropsType} from "features/auth/auth.api";
import {ResultCode} from "common/enums/common.enums";
import {createAppAsyncThunk} from "common/utils";
import {thunkTryCatch} from "common/utils/thunk-try-catch";


const initialState = {
    isLoggedIn: false,
}
type initialStateType = typeof initialState


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginPropsType>
('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appAction.setAppStatus({status: 'loading'}))
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !res.data.messages.length
            handleServerAppError(dispatch, res.data, isShowAppError)
            return rejectWithValue(res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        dispatch(appAction.setAppStatus({status: 'idle'}))
    }
})


const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.Success) {
             dispatch(tasksAction.clearTasks())
            dispatch(todolistsAction.clearTodolist())
            return {isLoggedIn: false}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('app/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        dispatch((appAction.setInitializeApp({isInitialized: true})))
    }
})


const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer
export const authAction = slice.actions
export const authThunk = {login, logout, initializeApp}
