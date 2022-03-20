import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type FilterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML/CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'React', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }


    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
