import React, { useCallback, useState } from 'react'
import AuxilaryComponent from '../Hoc/AuxilaryComponent';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../slices/postsSlice';
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

    const onDeleteHandler = useCallback((uniqueid)=>{
        console.log('On delete handler-->', uniqueid);
        dispatch(deletePost({id:uniqueid}));
    });
    
    const showAllPosts = (allPosts) => {
        let rowId = 1;
        const rows = allPosts.map((index) => {
            const indexid = rowId;
            rowId = indexid + 1;
            return (
                <tr key={index.id}>
                    <td scope="col">{indexid}</td>
                    <td scope="col">{index.title}</td>
                    <td>
                        <button id={index.id} onClick={(e)=>{onDeleteHandler(index.id)}} value='Delete'> Delete </button>
                    </td>
                </tr>
            )
        });
        const showPostForm = () => {
            return <AddPostFormComponent />;
        }
        return (
            <>
                <ModelBoxComponent title={'Create new post'} body={showPostForm()}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Action</th>
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