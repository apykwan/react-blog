import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react';

import { getCurrentTopic } from '../redux/reducers/postSlice';

export default function SinglePost() {
    const dispatch = useDispatch();
    const postData = useSelector(state => state.post.currentTopic);
    const location = useLocation();

    useEffect(()=> {
        const url = `/getCurrentTopic?id=${location.state}`;
        dispatch(getCurrentTopic(url));

        const errorFetchTimeout = setTimeout(()=> {
            if(location.state == null) 
                window.location.href='/404';
        },100);

        return () => clearTimeout(errorFetchTimeout);
    },[location.state]);
    return (
        <>
            {postData != null && <Container maxW='1200px'  marginTop={'50px'}>
                <Heading
                    size='lg'
                    textAlign='center'
                    color='gray.700'
                >
                    {postData.title}
                </Heading>
                <img src={postData.image} width='300px' height='100px'/>
                <br/>
                <hr/>
                <br/>
                <p>
                    {postData.content}
                </p>
                </Container>
            }
        </>
    );
}
