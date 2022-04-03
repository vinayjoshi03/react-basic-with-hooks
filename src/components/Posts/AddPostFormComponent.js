import React, { useState, useReducer, useCallback} from "react";
import { addPost } from '../../slices/postsSlice';
import { hideModelBox } from '../../slices/global';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import addPostConfig from './AddPostConfig';
const shortid = require('shortid');
const AddPostFormComponent = () => {
    const [formFieldData, setFieldConfig] = useState({});
    const [titleError, settitleError] = useState({
        postTitle: {
            errorMessage: '',
            error: false
        },
        postCategory: {
            errorMessage: '',
            error: false
        }

    });
    const [isDisabled, setisDisabled] = useState(false);
    //const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { postTitle, postCategory } = addPostConfig;
    const validation = useCallback((dataObj) => {
        const AllRequiredFields = Object.values(addPostConfig).filter(item => { return onlyRequiredFields(item) });
        var isError = false;
        AllRequiredFields.map(async (item) => {

            if (dataObj[item.id] === undefined || checkLength(dataObj[item.id]) === 0) {
                if (!isError) {
                    isError = true;
                }
                await settitleError({ ...titleError, [item.id]: { errorMessage: item.helperText, error: true } });
            }
        });
        const result = Object.values(titleError).every((e) => (e.error === true))
        return isError;
    },[formFieldData]);
    function checkLength(value) {

        switch (value.constructor.name) {
            case "String":
                return value.length;
            case "Object":
                return Object.keys(value).length;
            default:
                return null;

        }
    }
    function onlyRequiredFields(item) {
        if (item.required === true) {
            return item;
        }
    }
    const addPostActionHandler = (e) => {
        e.preventDefault();
        //e.preventDefault();
        let isError = false;
        if (Object.keys(formFieldData).length <= 0) {
            settitleError({
                ...titleError, [postTitle.id]: {
                    errorMessage: 'Please enter title',
                    error: true
                }, [postCategory.id]: {
                    errorMessage: 'Please select category',
                    error: true
                }
            })
            isError = true;
        } else {
            isError = validation(formFieldData);
        }
        if (isError === false) {
            dispatch(addPost({ id: shortid.generate(), data: formFieldData }));
            //setisDisabled(false);
            //settitleError('');
            setisDisabled(false);
            dispatch(hideModelBox());
        }
    };
    const fieldOnchage = async (event, fieldValue = undefined) => {
        const fieldName = (event.target.id !== 'postTitle') ? 'postCategory' : event.target.id;

        //console.log(fieldName);
        const value = (fieldValue) ? fieldValue : event.target.value;
        await setFieldConfig({ ...formFieldData, [fieldName]: value });
        let setError, errorText;
        if(checkLength(value) === 0) {
            setError = true; 
            errorText = addPostConfig[fieldName].helperText;

        } else {
            setError = false;
            errorText='';
        }
        settitleError({
            ...titleError, [fieldName]: {
                errorMessage: errorText,
                error: setError
            }
        });
        
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
                <div>
                    <TextField
                        helperText={titleError.postTitle.errorMessage}
                        name={postTitle.postTitle}
                        error={titleError.postTitle.error}
                        autoComplete={postTitle.autoComplete}
                        onChange={(e) => { fieldOnchage(e) }}
                        id={postTitle.id}
                        label={postTitle.label}
                        variant={postTitle.variant}
                        type={postTitle.type}

                    />
                </div>
                <div >
                    <Autocomplete
                        disablePortal
                        id={postCategory.id}
                        onChange={(e, value) => { fieldOnchage(e, value) }}
                        options={top100Films}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                            helperText={titleError.postCategory.errorMessage}
                            error={titleError.postCategory.error}
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