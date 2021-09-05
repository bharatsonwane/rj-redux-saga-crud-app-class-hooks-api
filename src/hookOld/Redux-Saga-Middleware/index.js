import { all } from "redux-saga/effects";
import TaskSaga from './TaskSaga'

export default function* rootSaga(){
    yield all([
        TaskSaga(),
    ])
}