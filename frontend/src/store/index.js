import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import { relationReducer, relationVisualizerReducer } from './reducers/relations';

export default configureStore({
  reducer: {
    users: usersReducer,
    relations: relationReducer,
    relationVis: relationVisualizerReducer
  }
});
