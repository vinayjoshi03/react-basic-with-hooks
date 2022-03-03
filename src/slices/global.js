import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModelBox: false,
    modelBody: null
}

export const global = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        showModelBox: (state, payload) => {
            state.showModelBox = true;
        },
        hideModelBox: (state) => {
            state.showModelBox = false;
        },
        setModelBody: (state) => {
            
        }
    }
});
export const { showModelBox, hideModelBox } = global.actions;
export default global.reducer;
