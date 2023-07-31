import {tasksReducer} from 'features/Todolistlist/tasks.reducer'
import {todolistsReducer} from 'features/Todolistlist/todolists.reducer'
import {AnyAction, combineReducers} from 'redux'
import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "app/app.reducer";
import {authReducer} from "features/auth/auth.reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer
})


// export const store_ = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
