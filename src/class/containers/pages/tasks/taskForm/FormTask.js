import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom';
import mdl from "./FormTask.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { createTaskActions, updateTaskActions } from "../../../../Redux-action"
import LoadingIndicator from "../../../../components/LoadingIndicator/LoadingIndicator"


class FormTask extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------
        // // by using props
        const taskState = this.props.taskState
        const taskField = taskState.taskField
        const isTaskUpdate = taskState.isTaskUpdate


        // // ----------Object Property------------------------------
        if (isTaskUpdate == true) {
            this.formEdit = true
        } else {
            this.formEdit = false
        }

        // // ----------state------------------------------
        this.state = {
            taskField: { ...taskField },
            err: {
                idErr: "",
                titleErr: "",
                uiTechErr: "",
                backEndTechErr: ""
            }
        }
    }


    // // ----------Lifecycle Method------------------------------
    componentDidUpdate(prevProps, prevState) {
        const { createResponce, createError, updateResponce, updateError } = this.props
        if (prevProps.createResponce !== createResponce && createResponce) {
            this.props.history.push('/task/retrieve')
            this.handleResetTask()
            setTimeout(() => {
                NotificationManager.success("Task Added successfully", "", 1000)
            }, 500);
        }
        else if (prevProps.createError !== createError && createError) {
            setTimeout(() => {
                NotificationManager.error("Something wrong happened..", "", 1000)
            }, 500);
        }
        else if (prevProps.updateResponce !== updateResponce && updateResponce) {
            this.props.history.push('/task/retrieve')
            this.handleResetTask()
            setTimeout(() => {
                NotificationManager.success("Task Updated successfully", "", 1000)
            }, 500);
        }
        else if (prevProps.updateError !== updateError && updateError) {
            setTimeout(() => {
                NotificationManager.error("Something wrong happened..", "", 1000)
            }, 500);
        }
    }


    // // ----------handler functions--------------------------------------------------
    handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            let updatedTask = { ...this.state }
            updatedTask.taskField.library[e.target.name] = !updatedTask.taskField.library[e.target.name]
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            let updatedTask = { ...this.state }
            updatedTask.taskField.technology[e.target.name] = e.target.value
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
        else {
            let updatedTask = { ...this.state }
            updatedTask.taskField[e.target.name] = e.target.value
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
    };


    handleCreateTask = async (e) => {
        const nameFormList = ["id", "title", "uiTech", "backEndTech"]
        nameFormList.forEach((nameForm) => {
            this.formValidation(nameForm)
        })
        const { id, title, date, description, technology, library } = this.state.taskField
        const { uiTech, backEndTech } = technology
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        if (id && title && uiTech && backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            let task = this.state.taskField
            console.log(this.props);
            this.props.actions.createTaskAction(task)
        }
    }

    handleUpdateTask = async (e) => {
        const { id, title, date, description, technology, library } = this.state.taskField
        const { uiTech, backEndTech } = technology
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        if (id && title && uiTech && backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            let task = this.state.taskField
            this.props.actions.updateTaskAction(task)
        }
    }

    handleResetTask = () => {
        this.setState({
            taskField: {
                id: "",
                date: "",
                title: "",
                description: "",
                technology: { uiTech: "", backEndTech: "" },
                library: { redux: false, saga: false, numpy: false, pandas: false }
            },
            err: {
                idErr: "",
                titleErr: "",
                uiTechErr: "",
                backEndTechErr: "",
            }
        })
    }

    formValidation = (nameForm) => {
        let updatedTask = { ...this.state }
        switch (nameForm) {
            // // id validation
            case 'id':
                let idErr = ""
                const idValue = this.state.taskField.id
                if (idValue === "" || null) {
                    idErr = "ID must not be empty"
                }
                else if (idValue.trim().length < 3) {
                    idErr = 'Id must be at least 3 characters!'
                }
                else {
                    idErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.idErr = idErr
                this.setState({ ...updatedTask })
                break;

            // // title validation
            case 'title':
                let titleErr = ""
                const regExp = /^[ 0-9a-zA-Z ]+$/
                const titleValue = this.state.taskField.title
                if (titleValue === null || titleValue.trim() === "") {
                    titleErr = "Title must not be empty"
                }
                else {
                    if (titleValue.match(regExp)) {
                        if (titleValue.trim().length < 5) {
                            titleErr = "Title must contain at least 5 characters"
                        }
                        else if (titleValue.trim().length > 15) {
                            titleErr = "Title must not exceed 15 characters"
                        }
                        else {
                            titleErr = ""
                        }
                    }
                    else {
                        titleErr = 'Title must not contain any symbols'
                    }
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.titleErr = titleErr
                this.setState({ ...updatedTask })
                break;

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = this.state.taskField.technology.uiTech
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.uiTechErr = uiTechErr
                this.setState({ ...updatedTask })
                break

            case "backEndTech":
                let backEndTechErr = ""
                const backEndTechValue = this.state.taskField.technology.backEndTech
                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.backEndTechErr = backEndTechErr
                this.setState({ ...updatedTask })
                break

            default:
                break;
        }
    }


    // // ----------Render------------------------------
    render() {
        const { id, date, title, description, technology, library } = this.state.taskField
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        const { isLoading } = this.props
        return (
            <div>
                <LoadingIndicator show={isLoading}></LoadingIndicator>
                <NotificationContainer />
                <form className={mdl.formStyle}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Task id:</label>
                            <input disabled={this.formEdit} type="text" name="id" value={id} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter task ID" />
                        </div>
                        <small style={{ color: "red" }}>{idErr}</small>
                    </div>

                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Date:</label>
                        <input type="date" name="date" value={date} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable}>Task Title:</label>
                            <input type="text" name="title" value={title} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter Task Title." />
                        </div>
                        <small style={{ color: "red" }}>{titleErr}</small>
                    </div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Task description :</label>
                        <textarea rows="6" cols="30" name="description" value={description} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)} >
                            <div className={mdl.formLable}  >UI Technology:</div>
                            <select name='uiTech' value={technology.uiTech} onChange={e => this.handleInputChange(e)} className="form-dropdown text-field">
                                <option value="" > Select </option>
                                <option value="react" > React </option>
                                <option value="angular"> Angular </option>
                                <option value="flutter"> Flutter </option>
                                <option value="vue.js"> Vue.js </option>
                            </select>
                        </div>
                        <small style={{ color: "red" }}>{uiTechErr}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <div className={mdl.formLable} >Back-End Technology :</div>
                            <label className={mdl.formBackEndLabel}>Python
                                <input type="radio" name="backEndTech" value="python" onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === 'python'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>.NET
                                <input type="radio" name="backEndTech" value=".net" onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === '.net'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>PHP
                                <input type="radio" name="backEndTech" value="php" onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === 'php'} />
                            </label>
                        </div>
                        <small style={{ color: "red" }}>{backEndTechErr}</small>
                    </div>
                    <div className={allClass("", "formField col", mdl)}>
                        <div className={mdl.formLable} >Library Used:</div>
                        <label className={mdl.formLibraryLabel}>Redux<input type="checkbox" name="redux" onChange={e => this.handleInputChange(e)} checked={library.redux} /> </label>
                        <label className={mdl.formLibraryLabel}>Saga<input type="checkbox" name="saga" onChange={e => this.handleInputChange(e)} checked={library.saga} /> </label>
                        <label className={mdl.formLibraryLabel}>Numpy<input type="checkbox" name="numpy" onChange={e => this.handleInputChange(e)} checked={library.numpy} /> </label>
                        <label className={mdl.formLibraryLabel}>Pandas<input type="checkbox" name="pandas" onChange={e => this.handleInputChange(e)} checked={library.pandas} /></label>
                    </div>

                    {this.formEdit === false ?
                        <div className="field-btn">
                            <button type='button' onClick={event => this.handleCreateTask(event)} className={allClass("btn btn-success", "buttonStyl", mdl)}>AddTask</button>
                            <button type="reset" onClick={event => this.handleResetTask(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                            <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                        </div>
                        :
                        <div className="field-btn">
                            <button type='button' onClick={event => this.handleUpdateTask(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>Update Task</button>
                            <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                        </div>
                    }
                </form>
            </div>
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
        createTaskAction: bindActionCreators(createTaskActions.create, dispatch),    // bindActionCreators(actionFunction, dispatch)
        updateTaskAction: bindActionCreators(updateTaskActions.update, dispatch),
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormTask))