import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import mdl from "./RetrieveTask.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod';
import { retrieveTaskActions, deleteTaskActions } from "../../../../Redux-action/"
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications'


class RetrieveTask extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------



        // // ----------Object Property------------------------------


        // // ----------state------------------------------
        this.state = {
            taskList: null
        }
    }


    // // ----------Lifecycle Method------------------------------
    // async request
    componentDidMount() {
        this.props.actions.retrieveTaskAction()
    }

    componentDidUpdate(prevProps, prevState) {
        const { retrieveResponce, retrieveError, deleteDataFlag, deleteError } = this.props
        console.log(prevProps.retrieveResponce)
        console.log(retrieveResponce)
        if (prevProps.retrieveResponce !== retrieveResponce && retrieveResponce) {
            let taskList = JSON.parse(this.props.retrieveResponce)
            this.setState({ taskList: taskList })
        }
        else if (prevProps.retrieveError !== retrieveError && retrieveError) {
            console.log(retrieveError);
            setTimeout(() => {
                NotificationManager.error("Something went wrong.", "", 1000)
            }, 500);
        }
        if (prevProps.deleteDataFlag !== deleteDataFlag && deleteDataFlag) {
            setTimeout(() => {
                NotificationManager.success("Task deleted successfully", "", 1000)
            }, 500);
        }
        else if (prevProps.deleteError !== deleteError && deleteError) {
            setTimeout(() => {
                NotificationManager.error("Something went wrong.", "Can not be delete task", 1000)
            }, 500);
        }
    }


    // // ----------handler functions--------------------------------------------------
    handleDeleteTask = (id) => {
        this.props.actions.deleteTaskAction(id)
    }

    handleEditTask = (task) => {
        this.props.history.push(`/task/update/:${task.id}`, {
            task: task
        });
    }

    handleTaskDetail = (tasks, task) => {
        // // 1st way using props.history
        this.props.history.push(`/task/detail/${task.id}`, {
            tasks: tasks, // total task list
            task: task   // single task
        })
    }

    // // ----------Render------------------------------
    render() {
        const { taskList } = this.state
        return (
            <React.Fragment>
                <LoadingIndicator show={this.props.isLoading} />
                <NotificationContainer />
                <div className="container">
                    {!this.props.isLoading &&
                        <div className="py-4">
                            <h1>Task List</h1>
                            {taskList != null && taskList[0] ?
                                <table className={mdl.table_hooks, "table border shadow"}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Sr.NO.</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th>Detail</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taskList && taskList.map((task, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{task.id}</td>
                                                <td>{task.date}</td>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)} onClick={(e) => this.handleTaskDetail(taskList, task)} >Detail</button></td>
                                                <td><button onClick={(e) => this.handleEditTask(task)} type="button" className="btn btn-warning">Edit</button></td>
                                                {/* <td><Link to={`/task/update/${task.id}/${task.date}/${task.title}/${task.description}`} type="button" className="btn btn-warning">Edit</Link></td> */}
                                                <td><button type="button" className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : <h3>Task List is not available.</h3>}
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}


// // ----------redux store mapStateToProps & mapDispatchToProps --------------------
const mapStateToProps = ({ TaskReducer }) => {
    // console.log("all data is", TaskReducer)
    return { ...TaskReducer }
}

// 1st way for dispatch action
const mapDispatchToProps = dispatch => ({
    actions: {
        retrieveTaskAction: bindActionCreators(retrieveTaskActions.retrieve, dispatch),    // bindActionCreators(actionFunction, dispatch)
        deleteTaskAction: bindActionCreators(deleteTaskActions.delete, dispatch),
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(RetrieveTask)
