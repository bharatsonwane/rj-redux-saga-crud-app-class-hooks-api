import { takeEvery, all, call, put, select } from "redux-saga/effects";
import axios from "axios";
import { baseURLconfig } from "../helper/config/baseURLconfig"
import { CREATE_TASK, RETRIEVE_TASK, UPDATE_TASK, DELETE_TASK } from '../Redux-action/Types'
import { createTaskActions, retrieveTaskActions, updateTaskActions, deleteTaskActions } from '../Redux-action/index'
import axiosConfig from "../helper/config/axiosConfig"


export const reducerModel = (state) => state.TaskReducer;


// // Add task Sagas
// const createTaskToServer = async (payload) => {
//     const url = baseURLconfig.devApiUrl;
//     const config = {
//         'Content-type': 'application/json',
//     }
//     const request = await axios.post(`${url}/todo`, payload, config)
//     return await request;
// }

const createTaskToServer = async (payload) => {
    const request = await axiosConfig().post(`/todo`, payload)
    return await request;
}

function* createTaskSaga() {
    let model = yield select(reducerModel)
    if (model.payload) {
        try {
            const response = yield call(createTaskToServer, model.payload)
            if (response) {
                yield put(createTaskActions.createSuccess(response.data))
            }
        } catch (error) {
            yield put(createTaskActions.createFailure(error))
        }
    } else {
        yield put(createTaskActions.createFailure('error occured'))
    }
}


// Task List Sagas
// const retrieveTaskFromServer = async () => {
//     console.log(baseURLconfig.devApiUrl)
//     var url = baseURLconfig.devApiUrl;
//     const request = await axios.get(`${url}/todo`)
//     return await request;
// }

const retrieveTaskFromServer = async (payload) => {
    const request = await axiosConfig().get(`/todo`)
    return await request;
}

function* retrieveTaskSaga() {
    try {
        const response = yield call(retrieveTaskFromServer)
        if (response) {
            yield put(retrieveTaskActions.retrieveSuccess(response.data))
        }
    } catch (error) {
        yield put(retrieveTaskActions.retrieveFailure(error))
    }
}



// // Update Task Sagas
// const updateTaskToServer = async (payload) => {
//     const url = baseURLconfig.devApiUrl;
//     const request = await axios.put(`${url}/todo`, payload)
//     return await request;
// }

const updateTaskToServer = async (payload) => {
    const request = await axiosConfig().put(`/todo`, payload)
    return await request;
}

function* updateTaskSaga() {
    let model = yield select(reducerModel)
    if (model.payload) {
        try {
            const response = yield call(updateTaskToServer, model.payload)
            if (response) {
                yield put(updateTaskActions.updateSuccess(response.data))
            }
        } catch (error) {
            console.log(error);
            yield put(updateTaskActions.updateFailure(error))
        }
    } else {
        yield put(updateTaskActions.updateFailure('error occured'))
    }
}


// // Delete Task Sagas
// const deleteTaskListFromServer = async (payload) => {
//     var url = baseURLconfig.devApiUrl;
//     const request = await axios.delete(`${url}/todo/${payload}`)
//     return await request;
// }

const deleteTaskListFromServer = async (payload) => {
    const request = await axiosConfig().delete(`/todo/${payload}`)
    return await request;
}

function* deleteTaskSaga() {
    let model = yield select(reducerModel)
    if (model.payload) {
        try {
            const response = yield call(deleteTaskListFromServer, model.payload)
            if (response) {
                const getResponse = yield call(retrieveTaskFromServer)
                yield put(deleteTaskActions.deleteSuccess(getResponse.data))
            }
        } catch (error) {
            console.log(error);
            yield put(deleteTaskActions.deleteFailure(error))
        }
    } else {
        yield put(deleteTaskActions.deleteFailure('error occured'))
    }
}


export const TaskSaga = [
    takeEvery(CREATE_TASK, createTaskSaga),
    takeEvery(RETRIEVE_TASK, retrieveTaskSaga),
    takeEvery(UPDATE_TASK, updateTaskSaga),
    takeEvery(DELETE_TASK, deleteTaskSaga),
]

export default function* rootSaga() {
    yield all([...TaskSaga])
}