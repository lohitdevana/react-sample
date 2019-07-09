import axios from 'axios';

import {
  POSTS_LOADING,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILURE
} from '../actionTypes';

export function postsFetchFailure(message) {
  return {
    type: POSTS_FETCH_FAILURE,
    payload: message
  };
}

export function postsLoading(bool) {
  return {
    type: POSTS_LOADING,
    payload: bool
  };
}

export function postsFetchSuccess(items) {
  return {
    type: POSTS_FETCH_SUCCESS,
    payload: items
  };
}

export function fetchPosts() {
  return async dispatch => {
    dispatch(postsLoading(true));
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {}
      );

      dispatch(postsLoading(false));
      dispatch(postsFetchSuccess(response.data));
    } catch (err) {
      dispatch(postsLoading(false));
      dispatch(postsFetchFailure(err.message));
    }
  };
}