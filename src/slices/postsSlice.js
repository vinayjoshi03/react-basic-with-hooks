import { createSlice } from "@reduxjs/toolkit";

let initialState = {
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

        },
        addPost: (state, payload) => {
            //state.posts = [...state.posts, payload];
            state.posts.push(payload.payload);
        }
    }
});
export const { getPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
