import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paginator, Container,PageGroup, usePaginator } from "chakra-paginator";
import PostList from '../components/PostList';
import { Grid } from '@chakra-ui/react';

import { fetchDataHandler } from '../helpers/utils';

export default function Main() {
   const [postsTotal, setPostsTotal] = useState(undefined);
    const [posts, setPosts] = useState([]);

    const {
        pagesQuantity,
        offset,
        currentPage,
        setCurrentPage,
        pageSize,
    } = usePaginator({
        total: postsTotal,
        initialState: {
            pageSize: 10,
            isDisabled: false,
            currentPage: 1
        }
    });

    const normalStyles = {
        w:10,
        h:10,
        bg: "#333",
        color: "#fff",
        fontSize:'lg',
        _hover: {
            bg:'red',
            color:'#fff',
        }
    }

    const activeStyles = {
        w:10,
        h:10,
        bg: "green",
        color: "#fff",
        fontSize:'lg',
        _hover: {
            bg:'blue',
        }
    }

    useEffect(()=>{
        let pageSize = 10;
        let offset = 0;
        let url = `/posts?limit=${pageSize}&offset=${offset}`;

        // Fetching posts from database
        fetchDataHandler(url).then(posts =>{
            if (posts) {
                setPostsTotal(posts.count);
                setPosts(posts.posts);
            }
        })
        .catch(err => console.log(err));
        
    },[currentPage, pageSize, offset])

    return (
        <Paginator 
            pagesQuantity={pagesQuantity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            activeStyles={activeStyles}
            normalStyles={normalStyles}
        >
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {posts.map(function({id, title, content, user_id, image}){
                    return <PostList key={id} id={id} title={title} content={content} userId={user_id} 
                        image={image}/>
                })}
            </Grid>
            <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                <PageGroup isInline align="center"/>
            </Container>
        </Paginator>
    )
}