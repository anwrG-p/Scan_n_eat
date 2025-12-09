import axios from 'axios';

// IMPORTANT: Change this to your computer's IP address when testing on physical devices
// Find your IP: Windows - ipconfig, Mac/Linux - ifconfig
const BASE_URL = 'http://localhost'; // Change to 'http://192.168.1.X' for physical devices

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Recipe Service (Port 8082)
export const recipeAPI = {
    getAllRecipes: () => api.get(`${BASE_URL}:8082/api/recipes`),
    getRecipeById: (id: number) => api.get(`${BASE_URL}:8082/api/recipes/${id}`),
    searchRecipes: (keyword: string) => api.get(`${BASE_URL}:8082/api/recipes/search?keyword=${keyword}`),
    getRecipesByCategory: (category: string) => api.get(`${BASE_URL}:8082/api/recipes/category/${category}`),
};

// Order Service (Port 8085)
export const orderAPI = {
    getAllOrders: () => api.get(`${BASE_URL}:8085/api/orders`),
    getOrderById: (id: number) => api.get(`${BASE_URL}:8085/api/orders/${id}`),
    createOrder: (orderData: any) => api.post(`${BASE_URL}:8085/api/orders`, orderData),
    getUserOrders: (userId: number) => api.get(`${BASE_URL}:8085/api/orders/user/${userId}`),
};

// History Service (Port 8080 - assuming shared service)
export const historyAPI = {
    getUserHistory: (userId: number) => api.get(`${BASE_URL}:8080/api/history/user/${userId}`),
};

// Report Service (Port 8080 - assuming shared service)
export const reportAPI = {
    submitReport: (reportData: any) => api.post(`${BASE_URL}:8080/api/reports`, reportData),
    getAllReports: () => api.get(`${BASE_URL}:8080/api/reports`),
};

// Auth Service (Port 8081)
export const authAPI = {
    login: (credentials: { username: string; password: string }) =>
        api.post(`${BASE_URL}:8081/api/auth/login`, credentials),
    register: (userData: any) => api.post(`${BASE_URL}:8081/api/auth/register`, userData),
};

export default api;
