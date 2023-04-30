import React, {ChangeEvent, useState} from 'react';
import {FiltersType} from "./App";
import './App.css';

type TodolistType = {
    title: string
    task: TasksType[]
    todolistId: string
    filter: string
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilterStatus: (todolistId: string, value: FiltersType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatusTask: (todolistId: string, taskId: string, filter: boolean) => void
    removeTodolist:(todolistId: string)=>void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() === '') {
            setError('Title is required')
        } else {
            props.addTask(props.todolistId, title.trim())
            setTitle('')
            setError(null)
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAllClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(props.todolistId, value)
    }
    const onActiveClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(props.todolistId, value)
    }
    const onCompletedClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(props.todolistId, value)
    }

    const removeTodolistHandler=()=> {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error ? <div className='error-message'>{error}</div> : ''}
            <ul>
                {props.task.map((t => {

                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(props.todolistId, t.id, e.currentTarget.checked)
                        }
                        const onClickHandler = () => {
                            props.removeTasks(props.todolistId, t.id)
                        }

                        return (
                            <div>
                                <li key={t.id}
                                    className={t.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                 checked={t.isDone}
                                                                                 onChange={changeStatusHandler}

                                />
                                    <span>{t.title}
                                        <button onClick={onClickHandler}>x</button>
                                    </span></li>
                            </div>

                        )
                    }

                ))}
            </ul>
            <div>
                <button onClick={() => {
                    onAllClickHandler('All')
                }}>All
                </button>
                <button onClick={() => {
                    onActiveClickHandler('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    onCompletedClickHandler('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;