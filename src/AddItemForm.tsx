import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() === '') {
            setError('Title is required')
        } else {
            props.addItem(title.trim())
            setTitle('')
            setError(null)
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>setTitle(e.currentTarget.value)

    return <div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   error={!!error}
                   label="Enter Text" variant="outlined"
                   helperText={error}/>
        <IconButton color='secondary' onClick={addTaskHandler}
        ><AddBox/></IconButton>
    </div>
})