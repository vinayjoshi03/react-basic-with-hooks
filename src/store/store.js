import { configureStore } from '@reduxjs/toolkit'
import postsSlice from '../slices/postsSlice';
console.log('Store-->', postsSlice);
export const store = configureStore({
  reducer: {
      posts: postsSlice
  },
})