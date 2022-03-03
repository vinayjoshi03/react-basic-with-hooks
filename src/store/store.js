import { configureStore } from '@reduxjs/toolkit'
import postsSlice from '../slices/postsSlice';
import global from '../slices/global';
export const store = configureStore({
  reducer: {
      posts: postsSlice,
      global: global
  },
})