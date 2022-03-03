import React from 'react'
import AuxilaryComponent from '../Hoc/AuxilaryComponent';
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../slices/postsSlice'
const Posts = () => {
    const posts = useSelector((state) => state);
    console.log('posts--->',posts );
    return (
        <>
            Post Component
        </>
    )
}

export default AuxilaryComponent(Posts);