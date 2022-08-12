import { createSlice, current } from "@reduxjs/toolkit";

let initialState = {
    posts: [{
        id: 'ssdfsdfsdfsdfsdsd',
        title: 'post 1',
        postCategoryId:1,
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
            console.log(payload);
            //state.posts = [...state.posts, payload];
            console.log(payload);
            const { payload: { data: { postTitle, postCategory } } } = payload;
            state.posts.push({id:payload.payload.id, title: postTitle, postCategoryId: postCategory});
        },
        deletePost: (state, payload) => {
            //const { id } = payload;
            const { posts } = current(state);
            const data = posts.filter((item) => {
                return item.id !== payload.payload.id;
            });
           state.posts = data;
        }
    }
});
export const { getPosts, addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
