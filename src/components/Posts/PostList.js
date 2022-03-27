import React, { useCallback, useState, Suspense } from 'react'
import AuxilaryComponent from '../Hoc/AuxilaryComponent';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../slices/postsSlice';
import { showModelBox } from '../../slices/global';
import ModelBoxComponent from '../ModelBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const AddPostFormComponent = React.lazy(() => import('./AddPostFormComponent'));
const shortid = require('shortid');
const PostList = () => {
    const [createPost, setCreatePost] = useState();
    const allStates = useSelector((state) => state);
    const dispatch = useDispatch();


    const createPostHandler = () => {
        dispatch(showModelBox());
    }

    const onDeleteHandler = useCallback((uniqueid) => {
        dispatch(deletePost({ id: uniqueid }));
    });

    const showAllPosts = (allPosts) => {
        let rowId = 1;
        const rows = allPosts.map((index) => {
            const indexid = rowId;
            rowId = indexid + 1;
            return (
                <TableRow key={index.id}>
                    <TableCell>{indexid}</TableCell>
                    <TableCell>{index.title}</TableCell>
                    <TableCell>

                        <DeleteIcon sx={{ color: 'red', 'cursor': 'pointer' }} onClick={(e) => { onDeleteHandler(index.id) }} />
                    </TableCell>
                </TableRow>
            )
        });
        const showPostForm = () => {
            return <Suspense fallback={<div>Loading...</div>}><AddPostFormComponent /></Suspense>;
        }
        return (
            <>
                <ModelBoxComponent title={'Create new post'} body={showPostForm()} />
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
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

export default AuxilaryComponent(PostList);