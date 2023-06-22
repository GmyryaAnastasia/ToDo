
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const inisialState={
    status:'loading' as RequestStatusType,
    error: null as string|null
}

type inisialStateType=typeof inisialState
type AnyAction=ReturnType<typeof setAppStatusAC>|ReturnType<typeof setErrorAC>

export const appReducer=(state:inisialStateType=inisialState,action:AnyAction)=>{
    switch (action.type){
        case'SET/APP-STATUS':{
            return {...state,status: action.status}
        }
        case 'SET/ERROR-APP':{
            return {...state,error: action.error}
        }
        default:
            return state
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type:'SET/APP-STATUS',status}as const)
export const setErrorAC=(error:string|null)=>({type:'SET/ERROR-APP',error}as const)