import axios from 'axios';

//Create user
export const createUser = async (userData) => {
    try {
        const {data} = await axios.post('/api/user', userData);

        if (data && data._id) {
            return {
                success: true,
                user: data,
                error: ''
            };
        } else {
            return {
                success: false,
                user: [],
                error: ''
            };
        }
    } catch (error) {
        return {
            success: false,
            error: 'An error occurred. User was not added to DB.'
        };
    }
};

//Get user
export const getUsers = async () => {
    try {
        const {data} = await axios.get('/api/user');
        return {
            success: true,
            users: data.map(user => user),
        };
    } catch (error) {
        return {
            success: false,
            users: [],
            error: 'No users found.'
        };
    }
};
