import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [{
        id: Math.random(-10000),
        title: 'post 1'
    }],
    errors: {}

}

export const postSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        getPosts: (state) => {

        }
    }
});
console.log('postSlice--->', postSlice.getInitialState());

export const { getPosts } = postSlice.actions;
export default postSlice.reducer;
