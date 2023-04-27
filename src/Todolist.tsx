import React, {ChangeEvent, useState} from 'react';
import {FiltersType} from "./App";
import './App.css';

type TodolistType = {
    title: string
    task: TasksType[]
    removeTodolist: (taskId: string) => void
    changeFilterStatus: (value: FiltersType) => void
    addTask: (title: string) => void
    changeStatusTask: (taskId: string, status: boolean) => void
}

type TasksType = {
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
            props.addTask(title.trim())
            setTitle('')
            setError(null)
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAllClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(value)
    }
    const onActiveClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(value)
    }
    const onCompletedClickHandler = (value: FiltersType) => {
        props.changeFilterStatus(value)
    }
    return (
        <div>
            <h3>{props.title}</h3>
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
                            props.changeStatusTask(t.id, e.currentTarget.checked)
                        }
                        const onClickHandler = () => {
                            props.removeTodolist(t.id)
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