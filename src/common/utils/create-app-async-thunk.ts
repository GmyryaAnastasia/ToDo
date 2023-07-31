import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatchType, AppRootStateType} from "app/store";

/**
 Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: any
}>