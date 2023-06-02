import React from 'react';
// import {FiltersType} from "./App";
// import './App.css';
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "./state/state";
// import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, removeTodolistAC} from "./state/tasks-reducer";
// import {changeFilterAC, changeTodolistTitleAC} from "./state/todolists-reducer";
// import {TodolistsType} from "./App";
//
//
// type TodolistType = {
//     todolist: TodolistsType
// }
//
// export type TasksType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// const TodolistWithRedux = memo(({todolist}: TodolistType) => {
//     const {id, title, filter} = todolist
//     let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
//     const dispatch = useDispatch()
//
//     const onAllClickHandler = (value: FiltersType) => dispatch(changeFilterAC(id, value))
//     const onActiveClickHandler = (value: FiltersType) => dispatch(changeFilterAC(id, value))
//     const onCompletedClickHandler = (value: FiltersType) => dispatch(changeFilterAC(id, value))
//     const removeTodolistHandler = () => dispatch(removeTodolistAC(id))
//     const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)),[dispatch])
//     const changeTodoTitleHandler = (title: string) => dispatch(changeTodolistTitleAC(id, title))
//
//     if (filter === 'Active') {
//         tasks = tasks.filter(f => !f.isDone)
//     }
//     if (filter === 'Completed') {
//         tasks = tasks.filter(f => f.isDone)
//     }
//
//     return <div>
//         <h3><EditableSpan value={title} onChange={changeTodoTitleHandler}/>
//             <IconButton onClick={removeTodolistHandler}><DeleteIcon/></IconButton>
//         </h3>
//         <AddItemForm addItem={addTask}/>
//
//
//         {tasks.map((t => {
//
//                 const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                     dispatch(changeTaskStatusAC(id, t.id, e.currentTarget.checked))
//                 }
//                 const removeTaskHandler = () => {
//                     dispatch(removeTaskAC(id, t.id))
//                 }
//
//                 const onChangeTitleTask = (title: string) => {
//                     dispatch(changeTitleTaskAC(id, t.id, title))
//                 }
//                 return <div key={t.id}
//                             className={t.isDone ? 'is-done' : ''}><Checkbox color="success"
//                                                                             checked={t.isDone}
//                                                                             onChange={changeStatusHandler}
//
//                 />
//                     <EditableSpan value={t.title} onChange={onChangeTitleTask}/>
//                     <IconButton onClick={removeTaskHandler}><DeleteIcon/></IconButton>
//                 </div>
//             }
//         ))}
//         <div>
//             <Button onClick={() => {
//                 onAllClickHandler('All')
//             }} color="secondary" variant={filter === 'All' ? "outlined" : 'text'}>All
//             </Button>
//             <Button onClick={() => {
//                 onActiveClickHandler('Active')
//             }} color="secondary" variant={filter === 'Active' ? "outlined" : 'text'}>Active
//             </Button>
//             <Button onClick={() => {
//                 onCompletedClickHandler('Completed')
//             }} color="secondary" variant={filter === 'Completed' ? "outlined" : 'text'}>Completed
//             </Button>
//         </div>
//     </div>
//
// });
//
// export default TodolistWithRedux;
//
