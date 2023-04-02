import axios from "axios";
import store from "../Store";


const API_URL = 'http://52.3.249.107:9000';


class HipsatgramApi {
    constructor(){
        this.API_URL = API_URL;
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.api.interceptors.request.use(config => {
            // if (config.url !== '/auth/login' || config.url !== '/auth/registration') {
                
            // }           
            config.headers.Authorization = store.getState().getCurrentUser.token;

            return config;
        });
    }

    async login(data) {
        const response = await this.api.post('/auth/login', data);
        console.log('api')
        return response.data;
    }

    async registration(data) {
        const response = await this.api.post('/auth/registration', data);
        return response.data;
    }

    async currentUser() {
        const response = await this.api.get('/users/current');
        return response.data;
    }

    async getUsers() {
        const response = await this.api.get('/users');
        return response.data;
    }

    async getUserById(userId) {
        const response = await this.api.get('/users/'+userId);
        return response.data;
    }

    async createPost(data) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('image', data.image);

        const response = await this.api.post('/posts', formData);
        return response.data;
    }

    async getPostById(postId) {
        const response = await this.api.get('/posts/'+postId);
        return response.data;
    }

    async getFeed() {
        const response = await this.api.get('/posts/feed');
        return response.data;
    }
}

export default new HipsatgramApi();

