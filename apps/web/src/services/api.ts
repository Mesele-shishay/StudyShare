import axios from 'axios';

// API base URL - adjust this based on your deployment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://studyshare-4ihz.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface TelegramUser {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  telegram_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{field: string; message: string}>;
}

export const userApi = {
  // Check if a Telegram user exists in the database
  async getUserByTelegramId(
    telegramId: string,
  ): Promise<ApiResponse<TelegramUser>> {
    try {
      const response = await api.get<ApiResponse<TelegramUser>>(
        `/users/${telegramId}`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  },

  // Create a new user
  async createUser(userData: {
    email: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    telegram_id: string;
  }): Promise<ApiResponse<{userId: number}>> {
    try {
      const response = await api.post<ApiResponse<{userId: number}>>(
        '/users',
        userData,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  },
};

export default api;
