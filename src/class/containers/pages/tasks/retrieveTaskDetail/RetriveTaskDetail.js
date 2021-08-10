import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import mdl from "./RetrieveTaskDetail.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod';
import { deleteTaskActions } from "../../../../Redux-action/"
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications'

export class RetriveTaskDetail extends Component {
    constructor(props) {
        super(props)
        this.task = props.location.state.task
        this.tasks = props.location.state.tasks
        console.log("tasks:", this.tasks, "task:", this.task)

        const { library } = this.task
        this.libraryList = []
        if (library.redux === true) {
            this.libraryList.push("redux")
        }
        if (library.saga === true) {
            this.libraryList.push("saga")
        }
        if (library.numpy === true) {
            this.libraryList.push("numpy")
        }
        if (library.pandas === true) {
            this.libraryList.push("pandas")
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { deleteDataFlag, deleteError } = this.props
        if (prevProps.deleteDataFlag !== deleteDataFlag && deleteDataFlag) {
            setTimeout(() => {
                NotificationManager.success("Task deleted successfully", "", 1000)
            }, 500);
            this.props.history.push(`/task/retrieve`)
        }
        else if (prevProps.deleteError !== deleteError && deleteError) {
            setTimeout(() => {
                NotificationManager.error("Error occure during deleting Task", "", 1000)
            }, 500);
        }
    }


    handleDeleteTask = (id) => {
        this.props.actions.deleteTaskAction(id)
    }

    handleEditTask = (task) => {
        this.props.history.push(`/task/update/${task.id}`, {
            task: task,
        })
    }

    render() {
        const { id, date, title, description, technology, library } = this.task
        return (
            <React.Fragment>
                <LoadingIndicator show={this.props.isLoading} />
                <NotificationContainer />
                <h3>Task Detail</h3>
                <div>
                    <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                    <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => this.handleEditTask(this.task)} > Edit </button>
                    <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => this.handleDeleteTask(this.task.id)} > Delete </button>
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
                                    {this.libraryList.map(lib => {
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
}


const mapStateToProps = ({ TaskReducer }) => {
    // console.log("all data is", TaskReducer)
    return { ...TaskReducer }
}


// 1st way for dispatch action
const mapDispatchToProps = dispatch => ({
    actions: {
        deleteTaskAction: bindActionCreators(deleteTaskActions.delete, dispatch),      // bindActionCreators(actionFunction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RetriveTaskDetail)