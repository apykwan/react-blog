import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import Main from '../pages/Main';
import SinglePost from '../pages/SinglePost';
import NotFound from '../pages/NotFound';

export default function Routers() {
    return (
        <Container maxW="1200px" marginTop={'50px'}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path=":slug" element={<SinglePost/>} />
                <Route path="/404" element={<NotFound/>} />
            </Routes>
        </Container>
    );
}