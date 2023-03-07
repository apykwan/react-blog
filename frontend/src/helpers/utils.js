import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8088/react-blog/api'
});

export const fetchDataHandler = async url => {
    try {
        const { data } = await instance.get(url);
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const slugify = string => {
    return string
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};