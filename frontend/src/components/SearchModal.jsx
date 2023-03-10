import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader,ModalFooter, 
    ModalBody, ModalCloseButton, Button, FormControl, Input, ListItem, UnorderedList
} from '@chakra-ui/react';

import { getSearchedItems, postActions } from '../redux/reducers/postSlice';
import { slugify } from '../helpers/utils';

export default function SearchModal({ onClose, isOpen }) {
    const dispatch = useDispatch();
    const searchResultItems = useSelector(state => state.post.searchedItems);
    const [searchTerm, setSearchTerm] = useState("");
    const initialRef = useRef();

	useEffect(() => {
        if(searchTerm.length < 1) return;
         
		const getUsersInput = setTimeout(() => {
			let url = `/searchResult?keyword=${searchTerm}`;

			dispatch(getSearchedItems(url));
		}, 100);
		
		return () => clearTimeout(getUsersInput);
	}, [dispatch, searchTerm]);
    return (
        <Modal
            initialFocusRef={initialRef}
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            bg='blue'
        >
            <ModalOverlay 
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />
            <ModalContent>
                <ModalHeader color={'#333'}>Type Keyword to search</ModalHeader>
                <ModalCloseButton onClick={() => dispatch(postActions.cleanSearchItems())} />
                <ModalBody pb={6}>
                    <FormControl mt={4}>
                        <Input 
                            placeholder=''
                            ref={initialRef}
                            color={'#333'}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </FormControl>
                    <br/>
                    {searchResultItems && 
                        <UnorderedList>
                            {searchResultItems.map(item => (
                                <Link 
                                    to={slugify(item.title)} 
                                    key={item.id} 
                                    state={item.id}
                                >
                                    <ListItem key={item.id}>{item.title}</ListItem>
                                </Link>
                            ))}
                        </UnorderedList>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        dispatch(postActions.cleanSearchItems());
                        onClose();
                    }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}