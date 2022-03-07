import React, { useState, useEffect, useCallback, useReducer } from "react";
import { addPost } from '../../slices/postsSlice';
import { showModelBox, hideModelBox } from '../../slices/global';
import { useSelector, useDispatch } from 'react-redux'
const shortid = require('shortid');

const AddPostFormComponent = () => {
    const [postTitle, setpostTitle] = useState('');
    const dispatch = useDispatch();
    const addPostActionHandler = useCallback((e) => {
        e.preventDefault();
        if (postTitle != null) {
            dispatch(addPost({ id: shortid.generate(), title: postTitle }));
        }
        dispatch(hideModelBox());
    });
 const [counter, reducerDispatch] = useReducer((state, action)=>{
     console.log('Initial-->',state)
     if(action.type == 'Increment') {
        state = state+1;
        console.log('incrmental-->',state)
     }
    return state;
 }, 0)
    return (
        <>
            <form onSubmit={(e) => { addPostActionHandler(e) }}>
                <div className={"mb-3 row"}>
                    <label for="title" class="col-sm-2 col-form-label">Title {counter}</label>
                    <div class="col-sm-10">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="postTitle" 
                        placeholder="Enter title" 
                        onChange={(e) => { if (e.target.value != '') { setpostTitle(e.target.value) } }}  />
                    </div>
                </div>
                <div className={"mb-3 row"}>
                    <label for="title" class="col-sm-2 col-form-label">&nbsp;</label>
                    <div class="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create post</button> &nbsp;
                        <button onClick={() => { dispatch(hideModelBox()); reducerDispatch({'type':'Increment'}) }} type="button" className="btn btn-primary">Close</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddPostFormComponent;