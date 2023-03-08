import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDataHandler } from '../../helpers/utils';

export const getPostItems = createAsyncThunk('post/getPostItems', async url => {
    try {
        return await fetchDataHandler(url);
    } catch (err) {
        console.log(err);
    }
});

export const getSearchedItems = createAsyncThunk('post/getSearchedItems', async url => {
    try {
        return await fetchDataHandler(url);
    } catch (err) {
        console.log(err);
    }
});

export const getCurrentTopic = createAsyncThunk('post/getCurrentTopic', async url => {
    try {
        return await fetchDataHandler(url);
    } catch (err) {
        console.log(err);
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        searchedItems: [],
        count: 0,
        currentTopic: {}
    },
    reducers: {
        cleanSearchItems(state) {
            state.searchedItems = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPostItems.fulfilled, (state, action) => {
                state.posts = action.payload.posts;
                state.count = action.payload.count;
            })
            .addCase(getSearchedItems.fulfilled, (state, action) => {
                state.searchedItems = action.payload.posts;
            })
            .addCase(getCurrentTopic.fulfilled, (state, action) => {
                state.currentTopic = action.payload;
            });
    }
});

export const postActions = postSlice.actions;
export default postSlice;