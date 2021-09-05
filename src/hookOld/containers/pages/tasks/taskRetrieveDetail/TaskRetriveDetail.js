import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from '../../../../helper/customHooks/customHooks' // custome useStateCallback hook
import { Link } from "react-router-dom"
import mdl from "./TaskRetrieveDetail.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { deleteTaskActions } from "../../../../Redux-action/"
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications'


function TaskRetriveDetail(props) {
    // // ----------Localization hooks & Router Hooks & Props-------------
    // // // 1st way => taking task data => using react router
    let task = props.location.state.task
    let tasks = props.location.state.tasks


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector(
        (state) => (state)
    );
    let taskReducer = reducerState.TaskReducer
    let isLoading = taskReducer.isLoading

    // // ----------hooks useState--------------------------------------------------



    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { deleteDataFlag, deleteError } = taskReducer
    const prevPropsState = usePrevious({ deleteDataFlag, deleteError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.deleteDataFlag !== deleteDataFlag && deleteDataFlag) {
                setTimeout(() => {
                    NotificationManager.success("Task deleted successfully", "", 1000)
                }, 500);
                props.history.push(`/task/retrieve`)
            } else if (prevPropsState.deleteError !== deleteError && deleteError) {
                setTimeout(() => {
                    NotificationManager.error("Error occure during deleting Task", "", 1000)
                }, 500);
            }
        }
    }, [taskReducer])


    // // ----------handler functions--------------------------------------------------
    const handleDeleteTask = (id) => {
        dispatch(deleteTaskActions.delete(id))
    }

    const handleEditTask = (task) => {
        props.history.push(`/task/update/${task.id}`, {
            task: task
        })
    }

    const { id, date, title, description, technology, library } = task
    let libraryList = []
    if (library.redux === true) {
        libraryList.push("redux")
    }
    if (library.saga === true) {
        libraryList.push("saga")
    }
    if (library.numpy === true) {
        libraryList.push("numpy")
    }
    if (library.pandas === true) {
        libraryList.push("pandas")
    }

    return (
        <React.Fragment>
            <LoadingIndicator show={isLoading} />
            <NotificationContainer />
            <h3>Task Detail</h3>
            <div>
                <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditTask(task)} > Edit </button>
                <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteTask(task.id)} > Delete </button>
            </div>
            <div className={mdl.container}>
                <table >
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <th>UI Technology</th>
                            <td>{technology.uiTech}</td>
                        </tr>
                        <tr>
                            <th>Back End Technology</th>
                            <td>{technology.backEndTech}</td>
                        </tr>
                        <tr>
                            <th>Library Used</th>
                            <td>
                                {libraryList.map(lib => {
                                    let para = <span>{lib}, </span>
                                    return para
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default TaskRetriveDetail
