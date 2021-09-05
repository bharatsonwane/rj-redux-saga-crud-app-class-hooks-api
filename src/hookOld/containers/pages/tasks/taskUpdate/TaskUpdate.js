import React, { createContext } from 'react'
import { useParams } from "react-router-dom"
import TaskForm from '../taskForm/TaskForm'

export const taskUpdateContext = createContext()

function TaskUpdate(props) {
    let params = useParams()
    let id = params.id
    let taskField = props.location.state.task
    const isTaskUpdate = true
    return (
        <React.Fragment>
            <div>
                {/* // // 1st way ==> send data to another component ==> by using props  */}
                <TaskForm taskField={taskField} isTaskUpdate={isTaskUpdate} />
            </div>
            <div>
                {/* // // 2nd way ==> send data to another component ==> by using context  */}
                {/* <taskUpdateContext.Provider value={{ taskField: taskField, isTaskUpdate: isTaskUpdate }} >
                    <TaskFormReducer />
                </taskUpdateContext.Provider> */}
            </div>
        </React.Fragment>
    )
}

export default TaskUpdate
