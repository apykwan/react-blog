import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react';

import { fetchHandler } from '../helpers/utils';

export default function SinglePost() {
    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData,setCurrentPost] = useState(null);

    useEffect(()=> {
        setPostData(location.state);

        const url = `http://localhost/reactPhp/api/getCurrentTopic?id=${postDataId}`;
        fetchHandler(url)
            .then(item => setCurrentPost(item))
            .then(err => toast.error("Fail to fetch"));

        const errorFetchTimeout = setTimeout(()=> {
            if(location.state == null)
            {
                window.location.href='/404';
            }
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
