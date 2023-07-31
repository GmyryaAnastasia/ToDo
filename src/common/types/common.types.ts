export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldErrorType[]
    data: D
}
type FieldErrorType={
    error:string
    field:string
}