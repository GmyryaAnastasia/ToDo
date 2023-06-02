import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "./Todolist";

type TasksTypeProps = {
    task: TasksType
    todolistId: string
    changeStatusTask: (todolistId: string, taskId: string, filter: boolean) => void
    removeTasks: (todolistId: string, taskId: string) => void
    changeTitleTask: (todolistId: string, taskId: string, title: string) => void
}


export const Tasks = memo((props: TasksTypeProps) => {
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(props.todolistId, props.task.id, e.currentTarget.checked)
    const removeTaskHandler = () => props.removeTasks(props.todolistId, props.task.id)
    const onChangeTitleTask = (title: string) => props.changeTitleTask(props.todolistId, props.task.id, title)

    return (
        <div key={props.task.id}
             className={props.task.isDone ? 'is-done' : ''}><Checkbox color="success"
                                                                      checked={props.task.isDone}
                                                                      onChange={changeStatusHandler}
        />
            <EditableSpan value={props.task.title} onChange={onChangeTitleTask}/>
            <IconButton onClick={removeTaskHandler}><DeleteIcon/></IconButton>
        </div>
    );
});
