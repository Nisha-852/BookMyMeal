import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl + '/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to attach token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')

        if (token) {
            config.headers['Authorization'] = JSON.stringify({
                id: `${id}`,
                token: `${token}`
            });
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response, // If response is successful, return it as is
    (error) => {
        return Promise.reject(error); // Simply reject the error without refreshing token
    }
);

export default axiosInstance;
