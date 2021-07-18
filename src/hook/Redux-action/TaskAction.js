import {
    CREATE_TASK, CREATE_TASK_FAILURE, CREATE_TASK_SUCCESS,
    RETRIEVE_TASK, RETRIEVE_TASK_FAILURE, RETRIEVE_TASK_SUCCESS,
    UPDATE_TASK, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS,
    DELETE_TASK, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS,
} from './Types'

// // CREATE ACTION
export const createTaskActions = {
    create: model => ({ type: CREATE_TASK, payload: model }),
    createSuccess: response => ({ type: CREATE_TASK_SUCCESS, payload: response }),
    createFailure: error => ({ type: CREATE_TASK_FAILURE, payload: error })
}

// // RETRIEVE ACTION
export const retrieveTaskActions = {
    retrieve: model => ({ type: RETRIEVE_TASK, payload: model }),
    retrieveSuccess: response => ({ type: RETRIEVE_TASK_SUCCESS, payload: response }),
    retrieveFailure: error => ({ type: RETRIEVE_TASK_FAILURE, payload: error })
}

// // UPDATE ACTION
export const updateTaskActions = {
    update: model => ({ type: UPDATE_TASK, payload: model }),
    updateSuccess: response => ({ type: UPDATE_TASK_SUCCESS, payload: response }),
    updateFailure: error => ({ type: UPDATE_TASK_FAILURE, payload: error })
}

// // Delete action
export const deleteTaskActions = {
    delete: model => ({ type: DELETE_TASK, payload: model }),
    deleteSuccess: response => ({ type: DELETE_TASK_SUCCESS, payload: response }),
    deleteFailure: error => ({ type: DELETE_TASK_FAILURE, payload: error })
}


// // // ###****Can be use following syntax & to use following syntax corresponding changes should be done in middleware and component **###
// // CREATE ACTION
// export const createTaskAction = (model) => ({
//     type: CREATE_TASK, payload: model
// })
// export const createTaskSuccessAction = (response) => ({
//     type: CREATE_TASK_SUCCESS, payload: response
// })
// export const createTaskFailureAction = (error) => ({
//     type: CREATE_TASK_FAILURE, payload: error
// })

// // // RETRIEVE ACTION
// export const retrieveTaskAction = () => ({
//     type: RETRIEVE_TASK,
// })
// export const retrieveTaskSuccessAction = (response) => ({
//     type: RETRIEVE_TASK_SUCCESS, payload: response
// })
// export const retrieveTaskFailureAction = (error) => ({
//     type: RETRIEVE_TASK_FAILURE, payload: error
// })

// // // UPDATE ACTION
// export const updateTaskAction = (EditTaskmodel) => ({
//     type: UPDATE_TASK, payload: EditTaskmodel
// })
// export const updateTaskSuccessAction = (response) => ({
//     type: UPDATE_TASK_SUCCESS, payload: response
// })
// export const updateTaskFailureAction = (error) => ({
//     type: UPDATE_TASK_FAILURE, payload: error
// })

// // // // Delete action
// export const deleteTaskAction = (model) => ({
//     type: DELETE_TASK, payload: model
// })
// export const deleteTaskSuccessAction = (response) => ({
//     type: DELETE_TASK_SUCCESS, payload: response
// })
// export const deleteTaskFailureAction = (error) => ({
//     type: DELETE_TASK_FAILURE, payload: error
// })