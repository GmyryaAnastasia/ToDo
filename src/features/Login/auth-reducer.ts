import {Dispatch} from "redux";
import {setAppStatusAC, setInitializeApp} from "../../app/app-reducer";
import {authAPI, LoginPropsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLogin: false,

}

type initialStateType = typeof initialState

type ActionType = ReturnType<typeof setIsLoggedInAC>

export const authReducer = (state: initialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-LOGIN': {
            return {...state, isLogin: action.statusLogin}
        }
        default:
            return state
    }
}

export const setIsLoggedInAC = (statusLogin: boolean) => ({type: 'SET-LOGIN', statusLogin} as const)
    export const loginTC = (data: LoginPropsType) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch((setIsLoggedInAC(true)))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e.messages)
            })
    }

    export const logoutTC = () => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch((setIsLoggedInAC(false)))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e.messages)
            })
    }


