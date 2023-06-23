import { tasksReducer } from '../features/Todolistlist/tasks-reducer'
import { todolistsReducer } from '../features/Todolistlist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer,
    auth:authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType=ThunkDispatch<AppRootStateType,any,AnyAction>
export const useAppDispatch=()=>useDispatch<AppDispatchType>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType>=useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
