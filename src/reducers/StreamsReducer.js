import _ from 'lodash';
import { 
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

const INITAL_STATE = {};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case EDIT_STREAM:
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return { ...state };
  }
};