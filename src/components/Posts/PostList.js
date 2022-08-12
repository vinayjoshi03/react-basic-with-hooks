import React, { useCallback, useState, Suspense } from 'react'
import AuxilaryComponent from '../Hoc/AuxilaryComponent';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../slices/postsSlice';
import { showModelBox } from '../../slices/global';
import ModelBoxComponent from '../ModelBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import postConfig from './AddPostConfig'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from 'axios';

const AddPostFormComponent = React.lazy(() => import('./AddPostFormComponent'));

const PostList = () => {

    const allStates = useSelector((state) => state);

    const dispatch = useDispatch();


    const createPostHandler = () => {
        dispatch(showModelBox());
    }
    const getCategoryName = (id) => {
        const category = postConfig.postCategory.options.filter((item) => (item.id == id));
        return category[0].label;
    }
    const onDeleteHandler = useCallback((uniqueid) => {
        dispatch(deletePost({ id: uniqueid }));
    });
    const [optionData, setOptionData] = useState({});
    const fetchOptionData = () => {

            let cookie;
            let url_oc = "https://www.nseindia.com/option-chain"
            let url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
            let headers = {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              'accept-language': 'en,gu;q=0.9,hi;q=0.8', 'accept-encoding': 'gzip, deflate, br'
            }
            
            const instance = axios.create({
              baseURL: url_oc,
              headers: headers,
              cookie: cookie ? cookie : ""
            });
            
            
            
            const getCookies = async () => {
              try {
                const response = await instance.get(url_oc);
                cookie = response.headers['set-cookie'].join();
              } catch (error) {
                if (error.response.status === 403) {
                  console.log("getCookies =========> error.status === 403");
                  await getCookies()
                } else {
                  console.log("getCookies ============> error");
                }
              }
            }
            
            
            const getAPIData = async () => {
              try {
                if (cookie) {
                  const response = await instance.get(url);
                  console.log(response.data.records.timestamp);
                }
            
              } catch (error) {
                if (error.response && error.response.status === 401) {
                  console.log("getAPIData =========> error.status === 401");
                  if (!cookie) {
                    console.log("getAPIData =========> cookie not found");
                    await getCookies()
                  }
                  await getAPIData()
                } else {
                  console.log("getAPIData =========> error");
                }
              }
            }
            
            
            
            (async () => {
              setInterval(async () => {
                await getCookies()
              }, 5000);
            
              setInterval(async () => {
                await getAPIData()
              }, 3000);
            })()
        
    }
    const showAllPosts = (allPosts) => {
        fetchOptionData();
        let rowId = 1;
        const rows = allPosts.map((index) => {
            const indexid = rowId;
            rowId = indexid + 1;
            return (
                <TableRow key={index.id}>
                    <TableCell>{indexid}</TableCell>
                    <TableCell>{index.title}</TableCell>
                    <TableCell>{getCategoryName(index.postCategoryId)}</TableCell>
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
                            <TableCell>Category</TableCell>
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
            <div><h1>Post Component</h1></div>
            <Divider />
            <Box sx={{ textAlign: 'right', m: 1 }}>
            <Button onClick={() => { createPostHandler() }} variant="outlined" startIcon={<AddIcon color="success" />}>
                Create Post
            </Button>
            </Box>
            {showAllPosts(allStates.posts.posts)}
        </>
    )
}

export default AuxilaryComponent(PostList);