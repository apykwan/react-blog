import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDataHandler } from '../../helpers/utils';

export const getPostItems = createAsyncThunk('post/getPostItems', async url => {
    try {
        const post = await fetchDataHandler(url);
        return post;
    } catch (err) {
        console.log(err);
    }
});


const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        searchedItems: [],
        count: 0
    },
    extraReducers: builder => {
        builder
            .addCase(getPostItems.fulfilled, (state, action) => {
                state.posts = action.payload.posts;
                state.count = action.payload.count;
            })
    }
});

export const postActions = postSlice.actions;
export default postSlice;