import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/UniversalButton/AddItemForm";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ])
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Mild', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks(
            {...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }
    const addTodolistHandler = (title:string) => {
        let newId=v1()
        setTodolists([{id:newId,title,filter:'all'},...todolists])
        setTasks({...tasks, [newId]:[]})
    }
    const updateTaskTitle = (todolistId:string,title:string,taskId:string) => {
      setTasks({...tasks,[todolistId]:tasks[todolistId].map(t=>t.id===taskId?{...t,title}:t)})
    }
    const updateTodolistTitle = (todolistId:string,title:string) => {
      setTodolists(todolists.map(tl=>tl.id===todolistId?{...tl,title}:tl))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolistHandler}/>
            {
                todolists.map(tl => {
                    let filteredTask = tasks[tl.id]
                    if (tl.filter === 'active') {
                        filteredTask = filteredTask.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        filteredTask = filteredTask.filter(t => t.isDone === true)
                    }
                    return (
                        <Todolist
                            updateTodolistTitle={updateTodolistTitle}
                            updateTaskTitle={updateTaskTitle}
                            removeTodolist={removeTodolist}
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={filteredTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;