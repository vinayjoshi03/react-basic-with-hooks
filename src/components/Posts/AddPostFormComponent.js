import React, { useState, useEffect, useCallback } from "react";
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
    
    return (
        <>
            <form onSubmit={(e) => { addPostActionHandler(e) }}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text" onChange={(e) => { if(e.target.value !='') {setpostTitle(e.target.value)} }} className="form-control" id="postTitle" placeholder="Enter title" />
                </div>
                <button type="submit" className="btn btn-primary">Create post</button> 
                <button onClick={()=> {dispatch(hideModelBox())}} type="button" className="btn btn-primary">Close</button>
            </form>
        </>
    )
}

export default AddPostFormComponent;