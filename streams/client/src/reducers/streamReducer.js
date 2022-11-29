import _ from "lodash";
import {
    FETCH_STREAM, 
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../actions/types";

const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // The mapKeys return a list with all ids and our respectives objects
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }; 
        case DELETE_STREAM:

            // Here we pass only the payload, because on the action we return only the deleted 'id', not the entire form.
            // export const deleteStream = (id) => {
            //     return async (dispatch) => {
            //         const response = streams.delete(`/streams/${id}`)
            //         dispatch({type: DELETE_STREAM, payload: id}) <--------------------
            //     }
            // }

            return _.omit(state, action.payload);
        default:
            return state;
    }
}

export default streamReducer;