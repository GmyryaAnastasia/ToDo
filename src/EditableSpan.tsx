import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    value: string
    onChange:(title:string)=>void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title,setTitle]=useState(props.value)
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.onChange(title)
    }

    const changeTitleHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler=(event: React.KeyboardEvent<HTMLInputElement>)=>{
        if (event.key === 'Enter') {
            activateViewMode()
        }
    }
    return editMode
                ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={changeTitleHandler} onKeyDown={onKeyPressHandler} variant="standard"/>
                : <span onDoubleClick={activateEditMode}>{props.value} </span>


};

