import React, { useState, useReducer, useCallback } from "react";
import { addPost } from '../../slices/postsSlice';
import { hideModelBox } from '../../slices/global';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import addPostConfig from './AddPostConfig';
import validateFields from "../../util/validationCommon";
const shortid = require('shortid');
const AddPostFormComponent = () => {
    const [formFieldData, setFieldConfig] = useState();
    const [titleError, settitleError] = useState({});
    const [isDisabled, setisDisabled] = useState(false);
    //const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { postTitle, postCategory } = addPostConfig;
    const [isTouched, setIsTouch] = useState();

   
    const addPostActionHandler = (e) => {
        e.preventDefault();
        console.log(formFieldData);
        const errors = validateFields(formFieldData, addPostConfig);
        console.log('On submit errors-->',errors);
        if(errors.length !== 0) {
            settitleError(errors);
        } else {
            dispatch(addPost({ id: shortid.generate(), data: formFieldData }));
            //setisDisabled(false);
            //settitleError('');
            setisDisabled(false);
            dispatch(hideModelBox());
        }
    };

    const onChangeHandler = (field, value, validateSingle=false) => {

        console.log("Field-->", field, "value-->", value);
        setFieldConfig({ ...formFieldData, [field]:value });
        let errors = null;
        if(validateSingle) {
            console.log('Single-->');
            errors = validateFields({[field]:value}, addPostConfig, true);
        } else {
            console.log('multiple-->');
            errors = validateFields(formFieldData, addPostConfig);
        }
        console.log(errors);
        if(errors !== null) {
            settitleError(errors);
        }
    } 
    const [counter, reducerDispatch] = useReducer((state, action) => {
        if (action.type == 'Increment') {
            state = state + 1;
        }
        return state;
    }, 0);
    const top100Films = postCategory.options;
    //const contestObj = useContext();
    //console.log(contestObj);

    return (
        <Box
            component="div"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <form onSubmit={e => addPostActionHandler(e)} >
                {JSON.stringify(formFieldData)} {JSON.stringify(isTouched)}
                <div>
                    <TextField
                        helperText={titleError.postTitle}
                        name={postTitle.postTitle}
                        error={(titleError.postTitle !== undefined)? true:false}
                        autoComplete={postTitle.autoComplete}
                        onChange={(e) => { onChangeHandler(e.target.id, e.target.value); }}
                        onFocus={(e)=>{setIsTouch({...isTouched, [e.target.id]: true})}}
                        // onBlur={(e)=>{onChangeHandler(e.target.id, e.target.value, true);}}
                        id={postTitle.id}
                        label={postTitle.label}
                        variant={postTitle.variant}
                        type={postTitle.type}
                    /> 
                </div>
                <div>
                    <Autocomplete
                        
                        id={postCategory.id}
                        onChange={(e, value) => { onChangeHandler("postCategory", value.id); }}
                        options={top100Films}
                        getOptionLabel={option => option.label}
                        sx={{ width: 300 }}
                        
                        onFocus={(e)=>{setIsTouch({...isTouched, "postCategory": true})}}
                        // onBlur={(e)=>{onChangeHandler("postCategory", '', true);}}
                        renderInput={(params) => <TextField
                            helperText={titleError.postCategory}
                            error={(titleError.postCategory !== undefined)?true:false}
                            id={postCategory.id} {...params}
                            label="Movie" />}
                    />
                </div>
                <div >
                    <Button disabled={isDisabled} sx={{ margin: '0 10px 0 0' }} size="small" type='submit' variant="contained">Create post</Button>
                    <Button size="small" onClick={() => { dispatch(hideModelBox()); reducerDispatch({ 'type': 'Increment' }) }} variant="outlined" color="error">
                        Close
                    </Button>
                </div>
            </form>
        </Box>
    )
}

export default AddPostFormComponent;