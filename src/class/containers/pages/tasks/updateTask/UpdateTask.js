import React, { Component } from "react";
import FormTask from "../taskForm/FormTask";

class UpdateTask extends Component {
    constructor(props) {
        super(props)
        
        // // 1st way
        let task = this.props.location.state.task

        // // 2nd way 
        // let task = this.props.match.params

        
        this.state = {
            taskField: task,
            isTaskUpdate: true
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Edit Task</h1>
                <FormTask taskState={this.state} />
            </div>
        )
    }
}

export default UpdateTask;
