// API configuration và utilities
import { API_CONFIG, ENDPOINTS } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
}

export interface MenuItem {
  url: string;
  label: string;
  icon: string;
}

export interface Setting {
  id: number;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Settings API methods
  async getAllSettings(): Promise<ApiResponse<Setting[]>> {
    return this.request<Setting[]>(ENDPOINTS.SETTINGS);
  }

  async getSettingByKey(key: string): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(`${ENDPOINTS.SETTINGS}/${key}`);
  }

  async getMenuSettings(): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(ENDPOINTS.SETTINGS_MENU);
  }

  async getMultipleSettings(keys: string[]): Promise<ApiResponse<Record<string, any>>> {
    return this.request<Record<string, any>>(ENDPOINTS.SETTINGS_BULK, {
      method: 'POST',
      body: JSON.stringify({ keys }),
    });
  }

  async createOrUpdateSetting(key: string, value: any): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(ENDPOINTS.SETTINGS, {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions
export const settingsApi = {
  getMenu: () => apiClient.getMenuSettings(),
  getAll: () => apiClient.getAllSettings(),
  getByKey: (key: string) => apiClient.getSettingByKey(key),
  getBulk: (keys: string[]) => apiClient.getMultipleSettings(keys),
  save: (key: string, value: any) => apiClient.createOrUpdateSetting(key, value),
}; 