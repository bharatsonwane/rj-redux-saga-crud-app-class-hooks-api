import {
    CREATE_TASK, CREATE_TASK_FAILURE, CREATE_TASK_SUCCESS,
    RETRIEVE_TASK, RETRIEVE_TASK_FAILURE, RETRIEVE_TASK_SUCCESS,
    UPDATE_TASK, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS,
    DELETE_TASK, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS,
} from "../Redux-action/Types"

// // Initial State
const initialState = {
    isLoading: false,
    payload: null,
    createResponce: null,
    createError: null,
    retrieveResponce: null,
    retrieveError: null,
    updateResponce: null,
    updateError: null,
    deleteDataFlag: false,
    deleteError: null,
}


export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        // // CREATE TASK
        case CREATE_TASK: return {
            ...state, isLoading: true, payload: action.payload, createResponce: null, createError: null,
        }
        case CREATE_TASK_SUCCESS: return {
            ...state, isLoading: false, createResponce: action.payload,
        }
        case CREATE_TASK_FAILURE: return {
            ...state, isLoading: false, createError: action.payload
        }

        // // RETRIEVE TASK
        case RETRIEVE_TASK: return {
            ...state, isLoading: true, payload: null, retrieveResponce: null, retrieveError: null,
        }
        case RETRIEVE_TASK_SUCCESS: return {
            ...state, isLoading: false, retrieveResponce: action.payload
        }
        case RETRIEVE_TASK_FAILURE:
            // console.log(action.payload);
            return {
                ...state, isLoading: false, retrieveError: action.payload
            }

        // // UPDATE TASK
        case UPDATE_TASK: return {
            ...state, isLoading: true, payload: action.payload, updateResponce: null, updateError: null,
        }
        case UPDATE_TASK_SUCCESS: return {
            ...state, isLoading: false, updateResponce: action.payload,
        }
        case UPDATE_TASK_FAILURE: return {
            ...state, isLoading: false, updateError: action.payload
        }

        // // Delete Task Reducers
        case DELETE_TASK: return {
            ...state, isLoading: true, payload: action.payload, deleteDataFlag: false, deleteError: null,
        }
        case DELETE_TASK_SUCCESS: return {
            ...state, isLoading: false, deleteDataFlag: true, retrieveResponce: action.payload,
        }
        case DELETE_TASK_FAILURE: return {
            ...state, isLoading: false, deleteError: action.payload
        }

        default: return { ...state }
    }

}