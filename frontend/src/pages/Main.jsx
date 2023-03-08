import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paginator, Container,PageGroup, usePaginator } from "chakra-paginator";
import PostList from '../components/PostList';
import { Grid } from '@chakra-ui/react';

import { getPostItems } from '../redux/reducers/postSlice';
import { defaultStyles, normalStyles, activeStyles } from '../themes/paginatorStyles';

export default function Main() {
    const dispatch = useDispatch();
    const { posts, count } = useSelector(state => state.post);

    const {
        pagesQuantity,
        offset,
        currentPage,
        setCurrentPage,
        pageSize,
    } = usePaginator({
        total: count,
        ...defaultStyles
    });

    useEffect(()=>{
        let pageSize = 10;
        let offset = 0;
        let url = `/posts?limit=${pageSize}&offset=${offset}`;

        // Fetching posts from database
        dispatch(getPostItems(url));
    },[currentPage, pageSize, offset, dispatch]);

    if(posts.length === 0) return;

    return (
        <Paginator 
            pagesQuantity={pagesQuantity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            activeStyles={activeStyles}
            normalStyles={normalStyles}
        >
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {posts.length > 0 && posts.map(({ id, title, content, user_id, image }) => (
                    <PostList 
                        key={id} 
                        id={id} 
                        title={title} 
                        content={content} 
                        userId={user_id} 
                        image={image}
                    />
                ))}
            </Grid>
            <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                <PageGroup isInline align="center"/>
            </Container>
        </Paginator>
    )
}