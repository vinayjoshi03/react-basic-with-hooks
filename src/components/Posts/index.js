import React, { useCallback, useState } from 'react'
import AuxilaryComponent from '../Hoc/AuxilaryComponent';
import { useSelector, useDispatch } from 'react-redux'

import { showModelBox } from '../../slices/global';
import ModelBoxComponent  from '../ModelBox';
import AddPostFormComponent from './AddPostFormComponent';
const shortid = require('shortid');
const Posts = () => {
    const [createPost, setCreatePost] = useState();
    const allStates = useSelector((state) => state);
    const dispatch = useDispatch();


    const createPostHandler = () => {
        dispatch(showModelBox());
    }
    
    const showAllPosts = (allPosts) => {
        let rowId = 1;
        const rows = allPosts.map((index) => {
            const indexid = rowId;
            rowId = indexid + 1;
            return (
                <tr key={shortid.generate()}>
                    <th scope="col">{indexid}</th>
                    <th scope="col">{index.title}</th>
                </tr>
            )
        });
        const showPostForm = () => {
            return <AddPostFormComponent />;
        }
        return (
            <>
                <ModelBoxComponent title={'Model Title'} body={showPostForm()} footer={"aasdfasfsd"}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </>
        )
    }
    return (
        <>
            
            Post Component
            
            <input type={"button"} value='Create New Post' onClick={() => { createPostHandler() }} />

            {showAllPosts(allStates.posts.posts)}
        </>
    )
}

export default AuxilaryComponent(Posts);