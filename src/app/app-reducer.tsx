import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const inisialState={
    status:'idle' as RequestStatusType,
    error: null as string|null,
    isInitialized: false
}

type InisialStateType=typeof inisialState
type AnyAction=ReturnType<typeof setAppStatusAC>|ReturnType<typeof setErrorAC> | ReturnType<typeof setInitializeApp>

export const appReducer=(state:InisialStateType=inisialState,action:AnyAction): InisialStateType=>{
    switch (action.type){
        case'SET/APP-STATUS':{
            return {...state,status: action.status}
        }
        case 'SET/ERROR-APP':{
            return {...state,error: action.error}
        }
        case 'SET-INITIALIZE': {
            return {...state, isInitialized: action.statusInitialize}
        }

        default:
            return {...state}
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type:'SET/APP-STATUS',status}as const)
export const setErrorAC=(error:string|null)=>({type:'SET/ERROR-APP',error}as const)
export const setInitializeApp = (statusInitialize: boolean) => ({type: 'SET-INITIALIZE', statusInitialize} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch((setIsLoggedInAC(true)))
            } else {

            }
            dispatch((setInitializeApp(true)))
        })


}