// src/services/api.ts
import { config, getToken } from "@/config/env_config";
import { catchAsync } from "@/util/catchAsync";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
    private axiosInstance: AxiosInstance;

    private token = getToken();

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.BASE_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        // Interceptors for request and response
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                // Handle errors globally
                const message =
                    error.response?.data?.message ||
                    "An unexpected error occurred";
                return Promise.reject(message);
            }
        );
    }

    // Generic GET method with error handling
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return await catchAsync(async () => {
            const response = await this.axiosInstance.get<T>(url, config);
            return response.data;
        });
    }

    // Generic POST method with error handling
    async post<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return await catchAsync(async () => {
            const response = await this.axiosInstance.post<T>(
                url,
                data,
                config
            );
            return response.data;
        });
    }
}

// Instantiate the API client
const apiClient = new ApiClient();

export default apiClient;
