import React, { createContext } from 'react'
import TaskForm from '../taskForm/TaskForm'


export const taskCreateContext = createContext()

function TaskCreate() {
    const taskField = {
        id: "",
        date: "",
        title: "",
        description: "",
        technology: { uiTech: "", backEndTech: "" },
        library: { redux: false, saga: false, numpy: false, pandas: false }
    }
    const isTaskUpdate = false


    return (
        <React.Fragment>
            <div>
                {/* // // 1st way ==> send data to another component ==> by using props  */}
                <TaskForm taskField={taskField} isTaskUpdate={isTaskUpdate} />
            </div>
            <div>
                {/* // // 2nd way ==> send data to another component ==> by using context  */}
                {/* <taskCreateContext.Provider value={{ taskField: taskField, isTaskUpdate: isTaskUpdate }} >
                    <TaskFormReducer />
                </taskCreateContext.Provider> */}
            </div>
        </React.Fragment>
    )
}

export default TaskCreate
