import React, { useState, useEffect, useCallback, useReducer, useContext, useRef } from "react";
import { addPost } from '../../slices/postsSlice';
import { showModelBox, hideModelBox } from '../../slices/global';
import { useSelector, useDispatch } from 'react-redux';
//import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const shortid = require('shortid');

const top100Films = [
    { label: 'Technology', id: 22343 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
  ];
const AddPostFormComponent = () => {
    const errorRef = useRef();
    const [postTitle, setpostTitle] = useState('');
    const [titleError, settitleError] = useState('');
    const dispatch = useDispatch();
    const addPostActionHandler = useCallback((e) => {
        e.preventDefault();
        settitleError('');
        if (postTitle !== null && postTitle.length>0) {
            dispatch(addPost({ id: shortid.generate(), title: postTitle }));
            dispatch(hideModelBox());
        } else {
            errorRef.current.style.color='red';
            settitleError('Please enter title');
        }
        
    });
    const [counter, reducerDispatch] = useReducer((state, action)=>{
        if(action.type == 'Increment') {
            state = state+1;
        }
        return state;
    }, 0);
    //const contestObj = useContext();
    //console.log(contestObj);
    return (
        <>
            <div>
                <code>{JSON.stringify(process.env)}</code>
            </div>
            <form onSubmit={(e) => { addPostActionHandler(e) }}>
                <div className={"mb-3 row"}>
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title {counter}</label>
                    <div className="col-sm-10">
                        {/* <input 
                        type="text" 
                        className="form-control" 
                        id="postTitle" 
                        placeholder="Enter title" 
                        onChange={(e) => { if (e.target.value != '') { setpostTitle(e.target.value) } }}  /> */}
                        <TextField onChange={(e) => { if (e.target.value != '') { setpostTitle(e.target.value) } }} id="outlined-basic" label="Title" variant="outlined" />
                        <label ref={errorRef}>{titleError}</label>
                    </div>
                </div>
                <div className={"mb-3 row"}>
                    <label htmlFor="title" className="col-sm-2 col-form-label">Movie</label>
                    <div className="col-sm-10">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                    </div>
                </div>
                <div className={"mb-3 row"}>
                    <label htmlFor="title" className="col-sm-2 col-form-label">&nbsp;</label>
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create post</button> &nbsp;
                        <button onClick={() => { dispatch(hideModelBox()); reducerDispatch({'type':'Increment'}) }} type="button" className="btn btn-primary">Close</button>
                    </div>
                </div>
                
            </form>
        </>
    )
}

export default AddPostFormComponent;